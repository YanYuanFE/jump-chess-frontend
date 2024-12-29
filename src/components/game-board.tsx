import { BoardState, Player, VALID_MOVES, POINT_COORDINATES } from '@/types';
import { StarPiece } from './star-piece';

interface GameBoardProps {
  board: BoardState;
  currentPlayer: Player;
  selectedPiece: number | null;
  onMove: (from: number, to: number) => void;
  onSelect: (position: number | null) => void;
}

export function GameBoard({ board = [], currentPlayer, selectedPiece, onMove, onSelect }: GameBoardProps) {
  const handleClick = (position: number) => {
    console.log(position, selectedPiece, board, currentPlayer);
    if (selectedPiece === null) {
      if (board[position] === currentPlayer) {
        const validMoves = VALID_MOVES[position] || [];
        console.log(validMoves);
        if (validMoves.some((movePos) => !board[movePos])) {
          onSelect(position);
        }
      }
    } else {
      const validMoves = VALID_MOVES[selectedPiece] || [];
      if (validMoves.includes(position) && !board[position]) {
        onMove(selectedPiece, position);
      } else {
        onSelect(null);
      }
    }
  };

  console.log(selectedPiece, 'ss');

  return (
    <div className="relative w-[300px] h-[300px] bg-sky-100 rounded-lg">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" strokeWidth="1" stroke="white" fill="none">
        <path d="M20,20 L20,80 L80,80 L80,20" />
        <line x1="20" y1="20" x2="80" y2="80" />
        <line x1="20" y1="80" x2="80" y2="20" />
      </svg>

      {POINT_COORDINATES.map((point, index) => (
        <div
          key={index}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`
          }}
        >
          <StarPiece player={board[index]} selected={selectedPiece === index} onClick={() => handleClick(index)} />
        </div>
      ))}
    </div>
  );
}
