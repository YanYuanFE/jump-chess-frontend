'use client';
import { useEffect, useState } from 'react';
import { GameBoard } from '@/components/game-board';
import { useGameSocket } from '@/hooks/useGameSocket';
import { GameState } from '@/types';
import { useAccount } from '@starknet-react/core';
import { useParams } from 'react-router-dom';

export default function GamePage() {
  const params = useParams<{ id: string }>();
  const { address } = useAccount();
  const [gameState, setGameState] = useState<GameState>({
    board: ['GREEN', null, 'ORANGE', 'ORANGE', 'GREEN'],
    currentPlayer: 'GREEN',
    winner: null,
    selectedPiece: null
  });

  const { makeMove } = useGameSocket(params!.id!, (newState) => {
    setGameState((prev) => ({ ...prev, ...newState }));
  });

  const handleMove = (from: number, to: number) => {
    makeMove(from, to);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">跳井棋</h1>
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
            <p className="text-xl font-semibold">{`${gameState.winner === 'GREEN' ? '绿色' : '橙色'}玩家获胜!`}</p>
          ) : (
            <p className="text-xl">当前玩家: {gameState.currentPlayer === 'GREEN' ? '绿色' : '橙色'}</p>
          )}
        </div>
      </div>
    </div>
  );
}
