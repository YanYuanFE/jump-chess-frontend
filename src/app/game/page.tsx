'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccount } from '@starknet-react/core';
import { useGameContract } from '@/hooks/useGameContract';
import { useDojoContext } from '@/components/DojoProvider';
import { useEffect } from 'react';
import { QueryBuilder } from '@dojoengine/sdk';
import { DojoStarterSchemaType } from '@/dojo/typescript/models.gen';
import { addAddressPadding, validateAndParseAddress } from 'starknet';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';

export default function GameLobbyPage() {
  const { address, account } = useAccount();
  const { client, db: sdk } = useDojoContext();
  const { waitForTransaction } = useGameContract();
  const navigate = useNavigate();

  // console.log(validateAndParseAddress(address!), 'sdk');

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
        query: new QueryBuilder<DojoStarterSchemaType>()
          .namespace('dojo_starter', (n) =>
            n.entity('Container', (e) => {
              console.log(e);
              return e.eq('creator', addAddressPadding(address!));
            })
          )
          .build(),
        callback: (response) => {
          if (response.error) {
            console.error('Error setting up entity sync:', response.error);
          } else {
            console.log('subscribed', response);
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
  }, [sdk, address]);

  const createGame = async () => {
    const tx = await client.actions.createGame(account as any);
    console.log(tx, 'tx');
    const res = await waitForTransaction(tx?.transaction_hash);
    console.log(res);
    navigate('/');
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-60px)]">
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
    </div>
  );
}
