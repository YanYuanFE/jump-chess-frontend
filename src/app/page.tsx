'use client';
import { ConnectWallet } from '@/components/ConnectWallet';
import { useDojoContext } from '@/components/DojoProvider';
import Game from '@/components/game';
import { GameRoomList } from '@/components/GameRoomList';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFetchContainers } from '@/hooks/useFetchData';
import { useGameContract } from '@/hooks/useGameContract';
import { useAccount } from '@starknet-react/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAddressPadding } from 'starknet';

const GameStatusMap = {
  0: 'Created',
  1: 'Joined',
  2: 'Finished'
};

export default function Home() {
  const { address, account } = useAccount();
  const { data } = useFetchContainers();
  const navigate = useNavigate();

  const { client, db: sdk } = useDojoContext();
  const { waitForTransaction } = useGameContract();

  const handleJoin = async (node: any) => {};

  console.log(data);
  return (
    <main className="container p-6">
      <Header />
      <div>
        <GameRoomList />
        {/* {data?.dojoStarterContainerModels?.edges?.map((item: any) => {
          const node = item?.node;
          return (
            <div key={item.id} className="space-y-6">
              <div className="flex gap-4 items-center">
                <div>
                  {parseInt(node?.game_id, 16)}、{node?.creator}
                </div>
                <Badge variant={'secondary'}>{GameStatusMap[node?.status as keyof typeof GameStatusMap]}</Badge>
                <Button onClick={() => handleJoin(node)}>Join</Button>
              </div>
              <div className="text-sm text-gray-500">Created by: {node?.creator}</div>
            </div>
          );
        })} */}
      </div>
    </main>
  );
}
