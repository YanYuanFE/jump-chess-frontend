'use client';
import { useEffect, useState } from 'react';
import { GameBoard } from '@/components/game-board';
import { useGameSocket } from '@/hooks/useGameSocket';
import { Container, GameData, GameState } from '@/types';
import { useAccount } from '@starknet-react/core';
import { useParams } from 'react-router-dom';
import { useDojoContext } from '@/components/DojoProvider';
import { useGameContract } from '@/hooks/useGameContract';
import { QueryBuilder } from '@dojoengine/sdk';
import { DojoStarterSchemaType } from '@/dojo/typescript/models.gen';
import { useFetchGameStatus } from '@/hooks/useFetchData';
import { Header } from '@/components/Header';

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
    selectedPiece: null
  });

  const { client, db: sdk } = useDojoContext();
  const { waitForTransaction } = useGameContract();
  const { data, refetch } = useFetchGameStatus();
  const [status, setStatus] = useState(0);

  console.log(sdk, data, 'sdk');

  const updateGameState = (game: Container) => {};

  useEffect(() => {
    if (data) {
      const current = data?.dojoStarterGameStatusEventModels.edges.find(
        (edge: any) => edge.node.game_id === params!.id!
      );
      if (current) {
        setStatus(current.node.status);
      }
    }
  }, [data]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const subscribe = async () => {
      const subscription = await sdk?.subscribeEntityQuery({
        query: new QueryBuilder<DojoStarterSchemaType>()
          .namespace('dojo_starter', (n) =>
            n.entity('Container', (e) => {
              console.log(e.eq('game_id', params!.id!), 'update');
              // return true;
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
            const game = (response as GameData).models.dojo_starter.Container;
            setStatus(game.status);
            updateGameState(game);
            refetch();
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
        <div className="my-6">Game Status: {GameStatusMap[status as keyof typeof GameStatusMap]}</div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <GameBoard
            board={gameState.board}
            currentPlayer={gameState.currentPlayer}
            selectedPiece={gameState.selectedPiece}
            onSelect={(position) => setGameState((prev) => ({ ...prev, selectedPiece: position }))}
            onMove={handleMove}
          />
          <div className="mt-4 text-center">
            {gameState.winner ? (
              <p className="text-xl font-semibold">{`${gameState.winner === 'GREEN' ? '绿色' : '橙色'} Player Wins!`}</p>
            ) : (
              <p className="text-xl">Current Player: {gameState.currentPlayer === 'GREEN' ? '绿色' : '橙色'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
