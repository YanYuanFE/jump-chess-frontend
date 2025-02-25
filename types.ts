export type Player = 'GREEN' | 'ORANGE';
export type BoardState = (Player | null)[];

export interface GameState {
  board: BoardState;
  currentPlayer: Player;
  winner: Player | null;
  selectedPiece: number | null;
}

export interface Point {
  x: number;
  y: number;
}

export const VALID_MOVES: { [key: number]: number[] } = {
  0: [1, 2, 4],   // Bottom-left to top-left, bottom-right, and center
  1: [0, 4],      // Top-left to bottom-left and center
  2: [0, 3, 4],   // Bottom-right to bottom-left, top-right, and center
  3: [2, 4],      // Top-right to bottom-right and center
  4: [0, 1, 2, 3] // Center to all four corners
};

export const POINT_COORDINATES: Point[] = [
  { x: 20, y: 80 },   // Bottom-left (0)
  { x: 20, y: 20 },   // Top-left (1)
  { x: 80, y: 80 },   // Bottom-right (2)
  { x: 80, y: 20 },   // Top-right (3)
  { x: 50, y: 50 },   // Center (4)
];

