'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccount } from '@starknet-react/core';
import { useGameContract } from '@/hooks/useGameContract';
import { useDojoContext } from '@/components/DojoProvider';

export default function GameLobbyPage() {
  // const { address } = useAccount();
  // // const { client, db, masterAccount } = useDojoContext();
  // // console.log(client, db, masterAccount);
  // const { createGame: createGameFromContract } = useGameContract();

  // const createGame = async () => {
  //   const res = await createGameFromContract();
  //   console.log(res);
  //   return;
  //   const gameId = Math.random().toString(36).substring(7);
  //   // router.push(`/game/${gameId}`);
  // };

  return 1213;

  // return (
  //   <div className="flex min-h-screen items-center justify-center bg-gray-100">
  //     <Card className="w-[350px]">
  //       <CardHeader>
  //         <CardTitle>Game Lobby</CardTitle>
  //         <CardDescription>Create or Join a game</CardDescription>
  //       </CardHeader>
  //       <CardContent className="space-y-4">
  //         <Button className="w-full" onClick={createGame}>
  //           Create Game
  //         </Button>
  //         {/* TODO: Add list of available games */}
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
}
