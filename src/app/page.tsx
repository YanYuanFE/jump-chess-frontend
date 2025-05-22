import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';

const Home = () => {
  const navigate = useNavigate();

  const handlePlayAI = () => {
    navigate('/create-room?mode=ai');
  };

  const handleMultiplayer = () => {
    navigate('/rooms');
  };

  const handleCreateRoom = () => {
    navigate('/create-room?mode=multiplayer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Jump Well Chess</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Challenge the AI, join multiplayer games, or create your own room to play with friends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Play vs AI</CardTitle>
              <CardDescription>Challenge our AI in a game of checkers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md flex items-center justify-center">
                <span className="text-6xl">🤖</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePlayAI} className="w-full">
                Start AI Game
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Join Multiplayer</CardTitle>
              <CardDescription>Join an existing room to play with others</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-gradient-to-br from-purple-100 to-purple-200 rounded-md flex items-center justify-center">
                <span className="text-6xl">🎮</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleMultiplayer} className="w-full">
                Browse Rooms
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Create Room</CardTitle>
              <CardDescription>Create your own game room</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-gradient-to-br from-green-100 to-green-200 rounded-md flex items-center justify-center">
                <span className="text-6xl">➕</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateRoom} className="w-full">
                Create Room
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Play</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold mb-2">1. Connect Wallet</h3>
              <p className="text-gray-600">Connect your Web3 wallet to access the game features.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold mb-2">2. Choose Game Mode</h3>
              <p className="text-gray-600">Play against AI or challenge other players in multiplayer mode.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold mb-2">3. Start Playing</h3>
              <p className="text-gray-600">Make your moves and try to capture all opponent&apos;s pieces.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
