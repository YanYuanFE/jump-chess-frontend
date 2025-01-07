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
import { GameData } from '@/types';

export default function GameLobbyPage() {
  const { address, account } = useAccount();
  const { client, db: sdk } = useDojoContext();
  const { waitForTransaction } = useGameContract();
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    const subscribe = async () => {
      if (!address) return;
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
          } else if (response.data && response.data[0].entityId !== '0x0') {
            console.log('subscribed', response);
            const game = (response.data[0] as GameData).models?.dojo_starter?.Container;
            if (game) {
              const gameId = game?.game_id?.toString(16);
              navigate(`/game/0x${gameId}`);
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
  }, [sdk, address]);

  const createGame = async () => {
    const tx = await client.actions.createGame(account as any);
    console.log(tx, 'tx');
    await waitForTransaction(tx?.transaction_hash);
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
