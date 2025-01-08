'use client';
import { useEffect, useState } from 'react';
import { GameBoard } from '@/components/game-board';
import { useGameSocket } from '@/hooks/useGameSocket';
import { Container, GameData, GameState, Player } from '@/types';
import { useAccount } from '@starknet-react/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useDojoContext } from '@/components/DojoProvider';
import { useGameContract } from '@/hooks/useGameContract';
import { QueryBuilder } from '@dojoengine/sdk';
import { SchemaType } from '@/dojo/typescript/models.gen';
import { useFetchGameStatus } from '@/hooks/useFetchData';
import { Header } from '@/components/Header';
import {
  GameOver,
  WaitingForOpponentMove,
  WaitingForPlayer,
  WaitingForYourMove,
  WaitingJoin
} from '@/components/WaitingAnimation';

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
    lastMove: ''
  });
  const navigate = useNavigate();

  const { client, db: sdk } = useDojoContext();
  const { waitForTransaction } = useGameContract();
  const [status, setStatus] = useState(0);

  console.log(sdk, gameState, address, 'state');

  const updateGameState = (game: Container) => {
    console.log(game, 'game');
    const board: any = [];
    // 给creator地址分配 GREEN
    //TODO color
    game.grids.forEach((grid) => {
      if (grid.occupied) {
        board[grid.name] = grid.player === game.creator ? 'GREEN' : 'ORANGE';
      } else {
        board[grid.name] = null;
      }
    });
    const isCreator = game.creator === address;
    console.log(isCreator, address, 'isCreator');

    let currentPlayer;
    if (game.last_move_player !== address) {
      currentPlayer = isCreator ? 'GREEN' : 'ORANGE';
    } else {
      currentPlayer = isCreator ? 'ORANGE' : 'GREEN';
    }

    setGameState({
      ...gameState,
      board,
      currentPlayer: currentPlayer as Player,
      lastMove: game.last_move_player,
      winner: game.status === 2 ? game.winner : null
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

  const handleMove = async (from: number, to: number) => {
    const id = parseInt(params!.id!, 16);
    const tx = await client.actions.move(account as any, from, to, id);
    const res = await waitForTransaction(tx?.transaction_hash);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-60px)]">
        <div>
          {status === 0 ? <WaitingForPlayer /> : null}
          {status === 1 ? gameState.lastMove !== address ? <WaitingForYourMove /> : <WaitingForOpponentMove /> : null}
          {status === 2 ? (
            <GameOver
              isWinner={gameState.winner === address}
              onReturnToLobby={() => {
                navigate('/');
              }}
            />
          ) : null}
        </div>
        {status !== 2 && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <GameBoard
              board={gameState.board}
              currentPlayer={gameState.currentPlayer}
              selectedPiece={gameState.selectedPiece}
              onSelect={(position) => setGameState((prev) => ({ ...prev, selectedPiece: position }))}
              onMove={handleMove}
            />
            <div className="mt-4 text-center">
              <p className="text-xl">Current Player: {gameState.currentPlayer === 'GREEN' ? 'Green' : 'Orange'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
