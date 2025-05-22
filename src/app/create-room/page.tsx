import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/sonner';
import { useDojoContext } from '@/components/DojoProvider';
import { useGameContract } from '@/hooks/useGameContract';
import { useAccount } from '@starknet-react/core';
import { GameData, GameMode } from '@/types';
import { addAgentToRoom } from '@/services';
import { QueryBuilder, SchemaType } from '@dojoengine/sdk';
import { addAddressPadding } from 'starknet';

const CreateRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const suggestedMode = (queryParams.get('mode') as GameMode) || 'multiplayer';
  const [gameMode, setGameMode] = useState<GameMode>(suggestedMode);

  const { client, db: sdk } = useDojoContext();
  const { waitForTransaction } = useGameContract();
  const [createLoading, setCreateLoading] = useState(false);
  const { address, account } = useAccount();

  const createGame = async () => {
    try {
      setCreateLoading(true);
      const tx = await client.actions.createGame(account as any);
      console.log(tx, 'tx');
      await waitForTransaction(tx?.transaction_hash);
    } finally {
      setCreateLoading(false);
    }
  };

  const createCallback = async (gameId: number) => {
    console.log(gameId, gameMode, 'gameId');
    if (gameMode === 'ai') {
      await addAgentToRoom(String(gameId));
    }
    toast.success('Room created successfully');
    navigate(`/game/${gameId}`);
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    const subscribe = async () => {
      if (!address) return;
      const subscription = await sdk?.subscribeEntityQuery({
        query: new QueryBuilder<SchemaType>()
          .namespace('dojo_starter', (n) =>
            n.entity('Container', (e) => {
              return e.eq('creator', addAddressPadding(address!));
            })
          )
          .build(),
        callback: (response) => {
          console.log('subscribed', response);
          if (response.error) {
            console.error('Error setting up entity sync:', response.error);
          } else if (response.data && response.data[0].entityId !== '0x0') {
            const game = (response.data[0] as GameData).models?.dojo_starter?.Container;
            console.log(game, 'game');
            if (game) {
              createCallback(game!.game_id);
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
  }, [sdk, address, gameMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createGame();
    } catch (error) {
      toast.error('Failed to create room');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Room</CardTitle>
          <CardDescription>Set up your game room settings</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* <div className="space-y-2">
              <Label htmlFor="roomName">Room Name</Label>
              <Input
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter a name for your room"
                required
              />
            </div> */}

            {/* <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="private">Private Room</Label>
                <p className="text-sm text-gray-500">Only players with the link can join</p>
              </div>
              <Switch id="private" checked={isPrivate} onCheckedChange={setIsPrivate} />
            </div> */}

            <div className="space-y-4">
              <Label>Game Mode</Label>
              <RadioGroup
                value={gameMode}
                onValueChange={(value) => setGameMode(value as GameMode)}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="ai" id="ai" className="peer sr-only" />
                  <Label
                    htmlFor="ai"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <div className="mb-2 text-2xl">🤖</div>
                    <div className="font-semibold">Play vs AI</div>
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      Challenge the computer in a game of checkers
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="multiplayer" id="multiplayer" className="peer sr-only" />
                  <Label
                    htmlFor="multiplayer"
                    className="h-full flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <div className="mb-2 text-2xl">👥</div>
                    <div className="font-semibold">Multiplayer</div>
                    <div className="text-xs text-gray-500 mt-1 text-center">Play against another human player</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate(-1)} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={createLoading}>
              {createLoading ? 'Creating...' : 'Create Room'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateRoom;
