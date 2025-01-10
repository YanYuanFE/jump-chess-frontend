import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn, delay, shortenAddress } from '@/lib/utils';
import { addAddressPadding } from 'starknet';
import { useDojoContext } from './DojoProvider';
import { useAccount } from '@starknet-react/core';
import { useGameContract } from '@/hooks/useGameContract';
import { QueryBuilder, SchemaType } from '@dojoengine/sdk';
import { GameData } from '@/types';

export function GameRoomList() {
  const { address, account } = useAccount();
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();

  const { client, db: sdk } = useDojoContext();
  const { waitForTransaction } = useGameContract();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const fetchEntities = async () => {
    const query = new QueryBuilder<SchemaType>()
      .namespace('dojo_starter', (n) =>
        n.entity('Container', (e) => {
          return e.gte('status', 0);
        })
      )
      .build();
    try {
      await sdk?.getEntities({
        query: query,
        callback: (resp) => {
          if (resp.error) {
            console.error('resp.error.message:', resp.error.message);
            return;
          }
          if (resp.data) {
            console.log(resp.data, 'res');
            const containers = resp.data
              ?.map((it: any) => it.models.dojo_starter?.Container)
              .sort((a, b) => b.game_id - a.game_id);
            setData(containers);
          }
        }
      });
    } catch (error) {
      console.error('Error querying entities:', error);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  const filteredRooms =
    data?.filter(
      (room: any) => room.game_id === searchTerm || room.creator.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleRefresh = async () => {
    fetchEntities();
    setIsLoading(true);
    await delay(3000);
    setIsLoading(false);
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    const subscribe = async () => {
      if (!address) return;
      const subscription = await sdk?.subscribeEntityQuery({
        query: new QueryBuilder<SchemaType>()
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
            console.log(game, 'game');
            if (game) {
              navigate(`/game/${game?.game_id}`);
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
    try {
      setCreateLoading(true);
      const tx = await client.actions.createGame(account as any);
      console.log(tx, 'tx');
      await waitForTransaction(tx?.transaction_hash);
    } finally {
      setCreateLoading(false);
    }
  };

  const joinRoom = async (node: any) => {
    const id = parseInt(node?.game_id, 16);
    if (addAddressPadding(node?.creator) !== address && node?.status === 0) {
      console.log(account, 'ac');
      const tx = await client.actions.joiningGame(account as any, id);
      console.log(tx, 'tx');
      if (!tx) return;
      const res = await waitForTransaction(tx?.transaction_hash);
      console.log(res);
    }
    navigate(`/game/${node?.game_id}`);
  };

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return <Badge variant="secondary">Waiting</Badge>;
      case 1:
        return <Badge variant="default">In Progress</Badge>;
      case 2:
        return <Badge variant="outline">Finished</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="relative flex justify-between py-6">
        <h1 className="text-2xl font-bold mb-6">Game Room List</h1>
        <Button onClick={createGame} loading={createLoading}>
          Create Game
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search by room number or creator"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        <Button onClick={handleRefresh} variant="outline" size="icon">
          <RefreshCw className={cn('h-4 w-4', isLoading ? 'animate-spin' : '')} />
          <span className="sr-only">Refresh list</span>
        </Button>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Room Number</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Players</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRooms.map((room: any) => (
              <TableRow key={room.game_id}>
                <TableCell className="font-medium">{room.game_id}</TableCell>
                <TableCell>{shortenAddress(room.creator)}</TableCell>
                <TableCell>{getStatusBadge(room.status)}</TableCell>
                <TableCell>{`${room.status === 0 ? 1 : 2}/2`}</TableCell>
                <TableCell>
                  <Button onClick={() => joinRoom(room)} disabled={room.status !== 0}>
                    Join
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredRooms.length === 0 && <p className="text-center text-muted-foreground mt-4">No matching rooms found</p>}
    </div>
  );
}
