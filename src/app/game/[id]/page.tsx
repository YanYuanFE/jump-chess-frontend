'use client';
import { useEffect, useState } from 'react';
import { GameBoard } from '@/components/game-board';
import { Container, GameData, GameState, Player } from '@/types';
import { useAccount } from '@starknet-react/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useDojoContext } from '@/components/DojoProvider';
import { useGameContract } from '@/hooks/useGameContract';
import { QueryBuilder } from '@dojoengine/sdk';
import { SchemaType } from '@/dojo/typescript/models.gen';
import {
  GameOver,
  GameResult,
  InvitationReceived,
  MovingInProgress,
  WaitingForOpponentMove,
  WaitingForPlayer,
  WaitingForYourMove,
  WaitingJoin
} from '@/components/WaitingAnimation';
import { shortenAddress } from '@/lib/utils';
import { globalConfig } from '@/constants';
import { Badge } from '@/components/ui/badge';
import { agentMove } from '@/services';

const GameStatusMap = {
  0: 'Wait for player join',
  1: 'Game Start',
  2: 'Finished'
};

export default function GamePage() {
  const params = useParams<{ id: string }>();
  const { address, account } = useAccount();
  const [gameState, setGameState] = useState<GameState>({
    board: ['GREEN', null, 'ORANGE', 'ORANGE', 'GREEN'],
    currentPlayer: 'GREEN',
    winner: null,
    selectedPiece: null,
    lastMove: '',
    creator: ''
  });
  const [colorMap, setColorMap] = useState<any>({});
  const navigate = useNavigate();

  const { client, db: sdk } = useDojoContext();
  const { waitForTransaction } = useGameContract();
  const [status, setStatus] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isAiMode, setIsAiMode] = useState(false);
  const [agentData, setAgentData] = useState<any>({});

  console.log(sdk, gameState, address, 'state');

  const updateGameState = (game: Container) => {
    console.log(game, 'game');
    const board: any = [];
    const tempData: any = {};
    // 给creator地址分配 GREEN
    game.grids.forEach((grid) => {
      if (grid.occupied) {
        if (grid.player === globalConfig.aiAddress) {
          if (!tempData.b1) {
            tempData.b1 = String(grid.name);
          } else {
            tempData.b2 = String(grid.name);
          }
        } else {
          if (!tempData.a1) {
            tempData.a1 = String(grid.name);
          } else {
            tempData.a2 = String(grid.name);
          }
        }
        board[grid.name] = grid.player === game.creator ? 'GREEN' : 'ORANGE';
      } else {
        tempData.empty_positon = String(grid.name);
        board[grid.name] = null;
      }
    });
    console.log(tempData, 'tempData');
    setAgentData(tempData);
    const players = [...new Set(game.grids.filter((grid) => grid.occupied).map((grid) => grid.player))];
    if (players.includes(globalConfig.aiAddress)) {
      setIsAiMode(true);
    }
    const playerMap = players.reduce(
      (acc, player) => {
        return {
          ...acc,
          [player]: player === game.creator ? 'GREEN' : 'ORANGE'
        };
      },
      {} as Record<string, any>
    );
    const colorMap = players.reduce(
      (acc, player) => {
        const color = player === game.creator ? 'GREEN' : 'ORANGE';
        acc[color] = player;
        return acc;
      },
      {} as Record<string, string>
    );
    setColorMap(colorMap);
    console.log(players, colorMap, gameState, 'players');
    const currentPlayer = players.find((player) => player !== game.last_move_player)!;

    setGameState({
      ...gameState,
      board,
      currentPlayer: playerMap[currentPlayer as string] as Player,
      lastMove: game.last_move_player,
      winner: game.status === 2 ? game.winner : null,
      creator: game.creator
    });
    setStatus(game.status);
  };

  const fetchEntities = async () => {
    const query = new QueryBuilder<SchemaType>()
      .namespace('dojo_starter', (n) =>
        n.entity('Container', (e) => {
          return e.eq('game_id', params!.id);
        })
      )
      .build();
    try {
      await sdk?.getEntities({
        query: query,
        callback: (resp) => {
          if (resp.error) {
            console.error('resp.error.message:', resp.error.message);
            return;
          }
          if (resp.data) {
            console.log(resp.data, 'res');
            const current = resp.data?.find(
              (it: any) => it.models.dojo_starter?.Container.game_id === Number(params!.id!)
            );
            if (current) {
              updateGameState(current.models.dojo_starter.Container as any);
            }
            console.log(current, 'current');
          }
        }
      });
    } catch (error) {
      console.error('Error querying entities:', error);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const subscribe = async () => {
      const subscription = await sdk?.subscribeEntityQuery({
        query: new QueryBuilder<SchemaType>()
          .namespace('dojo_starter', (n) =>
            n.entity('Container', (e) => {
              return e.eq('game_id', params!.id!);
            })
          )
          .build(),
        callback: (response) => {
          console.log(response);
          if (response.error) {
            console.error('Error setting up entity sync:', response.error);
          } else if (response.data && response.data[0].entityId !== '0x0') {
            console.log('subscribed', response);
            const game = (response.data[0] as GameData).models?.dojo_starter?.Container;
            if (game) {
              updateGameState(game);
            }
          }
        }
      });

      unsubscribe = () => subscription?.cancel();
    };

    subscribe();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [sdk, address, params!.id!]);

  const handleAIMove = async (from: number, to: number) => {
    agentMove({
      move_a_from: String(from),
      move_a_to: String(to),
      game_id: String(params!.id!),
      ...agentData
    });
  };

  const handleMove = async (from: number, to: number) => {
    try {
      if (isMoving) return;
      setIsMoving(true);
      const id = params!.id!;
      const tx = await client.actions.move(account as any, from, to, id);
      if (!tx) return;
      const res = await waitForTransaction(tx?.transaction_hash);
      if (isAiMode) {
        handleAIMove(from, to);
      }
      console.log(res, isAiMode, 'ai');
    } finally {
      setIsMoving(false);
    }
  };

  const PlayerTag = ({ player, color }: { player: any; color: string }) => (
    <div
      className={`flex items-center gap-2 p-2 rounded-full ${color === 'GREEN' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
    >
      <span className="font-medium">{shortenAddress(player)}</span>
      {player === globalConfig.aiAddress && (
        <span className="bg-white text-black text-xs px-2 py-1 rounded-full">AI</span>
      )}
      {player === address && <span className="bg-white text-black text-xs px-2 py-1 rounded-full">You</span>}
      <span>{gameState.currentPlayer === color ? 'Playing' : ''}</span>
    </div>
  );

  const joinRoom = async () => {
    const id = params.id!;
    const tx = await client.actions.joiningGame(account as any, id);
    console.log(tx, 'tx');
    if (!tx) return;
    const res = await waitForTransaction(tx?.transaction_hash);
    console.log(res);
  };

  const isPlayer = address === colorMap['GREEN'] || address === colorMap['ORANGE'];

  const isShowPlayState = status === 1 && isPlayer && !isMoving;

  const currentUserColor = address === colorMap['GREEN'] ? 'GREEN' : 'ORANGE';
  const opponentColor = currentUserColor === 'GREEN' ? 'ORANGE' : 'GREEN';

  console.log(isPlayer, 'isPlayer');

  return (
    <div className="bg-gray-100 h-full container mx-auto">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {status !== 0 ? (
          <div className="flex gap-2 py-4">
            <Badge variant="outline">{isAiMode ? 'AI Mode' : 'PVP Mode'}</Badge>
          </div>
        ) : null}

        <div>
          {status === 0 ? (
            gameState.creator !== address ? (
              <InvitationReceived
                inviterAddress={gameState.creator}
                onAcceptInvitation={joinRoom}
                onDeclineInvitation={() => navigate('/')}
              />
            ) : (
              <WaitingForPlayer roomNumber={params!.id!} onCancel={() => navigate('/')} />
            )
          ) : null}
          {isMoving ? <MovingInProgress /> : null}
          {isShowPlayState ? (
            gameState.lastMove !== address ? (
              <WaitingForYourMove />
            ) : (
              <WaitingForOpponentMove />
            )
          ) : null}
          {status === 2 ? (
            address === colorMap['GREEN'] || address === colorMap['ORANGE'] ? (
              <GameOver
                isWinner={gameState.winner === address}
                onReturnToLobby={() => {
                  navigate('/');
                }}
              />
            ) : (
              <GameResult
                winner={gameState.winner!}
                loser={gameState.winner! === colorMap['GREEN'] ? colorMap['ORANGE'] : colorMap['GREEN']}
                onReturnToLobby={() => navigate('/')}
              />
            )
          ) : null}
        </div>
        {status === 1 && (
          <div className="bg-white p-8 rounded-lg shadow-lg relative pt-10">
            <div className="flex justify-center mb-4">
              <PlayerTag player={colorMap[opponentColor]} color={opponentColor} />
            </div>
            <GameBoard
              board={gameState.board}
              currentPlayer={gameState.currentPlayer}
              selectedPiece={gameState.selectedPiece}
              onSelect={(position) => setGameState((prev) => ({ ...prev, selectedPiece: position }))}
              onMove={handleMove}
            />
            <div className="flex justify-center mt-4">
              <PlayerTag player={colorMap[currentUserColor]} color={currentUserColor} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
