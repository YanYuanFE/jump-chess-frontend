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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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

export function WaitingForPlayer() {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 0));
    }, 100);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-foreground">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-card-foreground p-8 max-w-md w-full space-y-6"
      >
        <div className="flex justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
            <Loader2 className="w-12 h-12 text-primary" />
          </motion.div>
        </div>
        <p className="text-center text-lg">Waiting for another player to join{dots}</p>
        <Progress value={progress} className="w-full" />
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
    <div className="flex flex-col items-center justify-center py-6">
      <div className="text-2xl font-bold text-gray-700">Now your turn{dots}</div>
      <div className="mt-4">
        <div className="w-12 h-12 rounded-full bg-green-500 animate-bounce">
          <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
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
    <div className="flex flex-col items-center justify-center py-6">
      <div className="text-2xl font-bold text-gray-700">Wait for the opponent to move{dots}</div>
      <div className="mt-4">
        <div className="w-12 h-12 rounded-full border-4 border-red-500 border-t-transparent animate-spin" />
      </div>
    </div>
  );
}
