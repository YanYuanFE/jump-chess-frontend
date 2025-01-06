import { useEffect, useState } from 'react';

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
    <div className="flex flex-col items-center justify-center">
      <div className="mt-8 text-2xl font-bold text-gray-700">Now your turn{dots}</div>
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
    <div className="flex flex-col items-center justify-center">
      <div className="mt-8 text-2xl font-bold text-gray-700">Wait for the opponent to move{dots}</div>
      <div className="mt-4">
        <div className="w-12 h-12 rounded-full border-4 border-red-500 border-t-transparent animate-spin" />
      </div>
    </div>
  );
}
