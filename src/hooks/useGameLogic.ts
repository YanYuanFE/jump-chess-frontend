'use client';

import { useState, useCallback } from 'react';
import { GameState, Player, VALID_MOVES } from '@/types';

const initialState: GameState = {
  board: [
    'GREEN',
    null,
    'ORANGE', // Bottom-left, Top-left, Bottom-right
    'ORANGE',
    'GREEN' // Top-right, Center
  ],
  currentPlayer: 'GREEN',
  winner: null,
  selectedPiece: null
};

function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const checkWinner = useCallback((board: (Player | null)[], currentPlayer: Player): Player | null => {
    const currentPlayerPieces = board
      .map((piece, index) => (piece === currentPlayer ? index : -1))
      .filter((index) => index !== -1);

    let hasValidMove = false;
    for (const piecePos of currentPlayerPieces) {
      const validMoves = VALID_MOVES[piecePos] || [];
      for (const movePos of validMoves) {
        if (!board[movePos]) {
          hasValidMove = true;
          break;
        }
      }
      if (hasValidMove) break;
    }

    return hasValidMove ? null : currentPlayer === 'GREEN' ? 'ORANGE' : 'GREEN';
  }, []);

  const selectPiece = useCallback((position: number | null) => {
    setGameState((prev) => ({
      ...prev,
      selectedPiece: position
    }));
  }, []);

  const makeMove = useCallback(
    (from: number, to: number) => {
      setGameState((prev) => {
        const validMoves = VALID_MOVES[from] || [];
        if (!validMoves.includes(to) || prev.board[to] !== null) {
          return prev; // Invalid move, return previous state unchanged
        }

        const newBoard = [...prev.board];
        newBoard[to] = newBoard[from];
        newBoard[from] = null;

        const nextPlayer = prev.currentPlayer === 'GREEN' ? 'ORANGE' : 'GREEN';
        const winner = checkWinner(newBoard, nextPlayer);

        return {
          board: newBoard,
          currentPlayer: nextPlayer,
          winner,
          selectedPiece: null
        };
      });
    },
    [checkWinner]
  );

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  return {
    gameState,
    selectPiece,
    makeMove,
    resetGame
  };
}

export { useGameLogic };
