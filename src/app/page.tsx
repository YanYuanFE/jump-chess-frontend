'use client';
import { ConnectWallet } from '@/components/ConnectWallet';
import { useDojoContext } from '@/components/DojoProvider';
import Game from '@/components/game';
import { Button } from '@/components/ui/button';
import { useFetchContainers } from '@/hooks/useFetchData';
import { useGameContract } from '@/hooks/useGameContract';
import { useAccount } from '@starknet-react/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { address, account } = useAccount();
  const { data } = useFetchContainers();
  const navigate = useNavigate();

  const { client, db: sdk } = useDojoContext();
  const { waitForTransaction } = useGameContract();

  const handleJoin = async (node: any) => {
    const id = parseInt(node?.game_id, 16);
    const tx = await client.actions.joiningGame(account as any, id);
    const res = await waitForTransaction(tx?.transaction_hash);
    console.log(res);
    navigate(`/game/${id}`);
  };

  console.log(data);
  return (
    <main className="container p-6">
      <div className="flex justify-end">
        <ConnectWallet />
      </div>
      <div className="relative flex justify-end py-6">
        <Button onClick={() => navigate('/create')}>Create Game</Button>
      </div>
      <div className="space-y-6">
        {data?.dojoStarterContainerModels?.edges?.map((item: any) => {
          const node = item?.node;
          return (
            <div key={item.id} className="flex gap-4 items-center">
              <div>{parseInt(node?.game_id, 16)}、</div>
              <div>{node?.creator}</div>
              <div>Status: {node?.status}</div>
              <Button onClick={() => handleJoin(node)}>Join</Button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
