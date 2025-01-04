'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccount } from '@starknet-react/core';
import { useGameContract } from '@/hooks/useGameContract';
import { useDojoContext } from '@/components/DojoProvider';
import { useEffect } from 'react';
import { QueryBuilder } from '@dojoengine/sdk';
import { DojoStarterSchemaType } from '@/dojo/typescript/models.gen';
import { addAddressPadding } from 'starknet';

export default function GameLobbyPage() {
  const { address, account } = useAccount();
  const { client, db: sdk } = useDojoContext();
  const { waitForTransaction } = useGameContract();

  console.log(sdk, 'sdk');

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    // const subscribe = async () => {
    //   const subscription = await sdk?.subscribeEntityQuery({
    //     query: new QueryBuilder<DojoStarterSchemaType>()
    //       .namespace('dojo_starter', (n) => n.entity('Container', (e) => true))
    //       .build(),
    //     callback: (response) => {
    //       if (response.error) {
    //         console.error('Error setting up entity sync:', response.error);
    //       } else if (response.data) {
    //         console.log('subscribed', response);
    //       }
    //     }
    //   });
    //
    //   unsubscribe = () => subscription?.cancel();
    // };

    interface Container {
      /** Player identifier */
      game_id: string;
      status: number;
      creator: string;
      last_move_player: string;
    }

    type Schema = {
      dojo_starter: {
        Container: Container;
        //DirectionsAvailable: DirectionsAvailable;
        //Position: Position;
      };
    };

    const subscribe = async () => {
      const subscription = await sdk?.subscribeEntityQuery({
        query: new QueryBuilder<Container>()
          .namespace("dojo_starter", (n) =>
            n
              .entity("Container", (e) =>
                true
              )
          )
          .build(),
        callback: (response) => {
          if (response.error) {
            console.error(
              "Error setting up entity sync:",
              response.error
            );
          } else {
            console.log('subscribed', response);
          }
        },
      });

      unsubscribe = () => subscription.cancel();
    };

    subscribe();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [sdk, address]);

  const createGame = async () => {
    const tx = await client.actions.createGame(account as any);
    console.log(tx, 'tx');
    const res = await waitForTransaction(tx?.transaction_hash);
    console.log(res);
    return;
    const gameId = Math.random().toString(36).substring(7);
    // router.push(`/game/${gameId}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Game Lobby</CardTitle>
          <CardDescription>Create or Join a game</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" onClick={createGame}>
            Create Game
          </Button>
          {/* TODO: Add list of available games */}
        </CardContent>
      </Card>
    </div>
  );
}
