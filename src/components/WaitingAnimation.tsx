import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface GameOverProps {
  isWinner: boolean;
  onReturnToLobby: () => void;
}

export function GameOver({ isWinner, onReturnToLobby }: GameOverProps) {
  useEffect(() => {
    if (isWinner) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isWinner]);

  const emoji = isWinner ? '🏆' : '😢';
  const message = isWinner ? 'Congratulations! You Won!' : 'Game Over. Better luck next time!';
  const bgColor = isWinner ? 'bg-green-100' : 'bg-red-100';
  const textColor = isWinner ? 'text-green-800' : 'text-red-800';

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${bgColor} ${textColor} rounded-lg shadow-lg p-8 max-w-md w-full space-y-6 text-center`}
      >
        <div className="text-6xl mb-4">{emoji}</div>
        <h2 className="text-3xl font-bold">{message}</h2>
        <p className="text-xl">{isWinner ? "You've mastered the game! 🎉" : "Don't give up, keep practicing! 💪"}</p>
        <div className="flex flex-col space-y-4">
          <Button onClick={onReturnToLobby} variant="outline" size="lg">
            Return to Lobby 🏠
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

interface WaitingForPlayerProps {
  roomNumber: string;
  onCancel: () => void;
}

interface WaitingForPlayerToJoinProps {
  roomNumber: string;
  onCancel: () => void;
}

export function WaitingForPlayer({ roomNumber, onCancel }: WaitingForPlayerToJoinProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 min-w-md w-full space-y-6 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800">Waiting for Player to Join</h2>
        <p className="text-lg text-gray-600">
          Room: <span className="font-semibold">{roomNumber}</span>
        </p>
        <div className="flex justify-center space-x-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent flex items-center justify-center"
          >
            <span className="text-3xl">🎲</span>
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-4xl"
          >
            👥
          </motion.div>
        </div>
        <p className="text-xl text-gray-700 flex items-center justify-center">
          <span>Waiting for opponent</span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {dots}
          </motion.span>
        </p>
        <div className="flex justify-center space-x-2">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
            className="text-2xl"
          >
            🏁
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: 0.3 }}
            className="text-2xl"
          >
            🏁
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: 0.6 }}
            className="text-2xl"
          >
            🏁
          </motion.div>
        </div>
        <Button onClick={onCancel} variant="outline" className="w-full">
          Cancel and Return to Lobby 🚪
        </Button>
      </motion.div>
    </div>
  );
}

export const WaitingJoin = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="mt-8 text-2xl font-bold text-gray-700">Wait for opponents to join{dots}</div>
      <div className="mt-4 relative">
        <div className="w-12 h-12 rounded-full bg-white border-4 border-gray-400 animate-bounce" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-400 animate-ping" />
      </div>
    </div>
  );
};

export function WaitingForYourMove() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6 flex flex-col items-center justify-center bg-gray-100">
      <div className="text-2xl font-bold text-gray-700 flex items-center">
        <span className="mr-2">Your turn</span>
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          🤔
        </motion.span>
        <span>{dots}</span>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <motion.div
          className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-2xl">♟️</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-3xl"
        >
          👉
        </motion.div>
      </div>
    </div>
  );
}

export function WaitingForOpponentMove() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6 flex flex-col items-center justify-center bg-gray-100">
      <div className="text-2xl font-bold text-gray-700 flex items-center">
        <span className="mr-2">Opponent's turn</span>
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          ⏳
        </motion.span>
        <span>{dots}</span>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <motion.div
          className="w-12 h-12 rounded-full border-4 border-red-500 border-t-transparent flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <span className="text-2xl">🤖</span>
        </motion.div>
        <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 1, repeat: Infinity }} className="text-3xl">
          🤔
        </motion.div>
      </div>
    </div>
  );
}
