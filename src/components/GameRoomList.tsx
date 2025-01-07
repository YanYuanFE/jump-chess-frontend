import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn, delay, shortenAddress } from '@/lib/utils';
import { useFetchContainers } from '@/hooks/useFetchData';
import { addAddressPadding } from 'starknet';
import { useDojoContext } from './DojoProvider';
import { useAccount } from '@starknet-react/core';
import { useGameContract } from '@/hooks/useGameContract';

export function GameRoomList() {
  const { address, account } = useAccount();
  const { data, refetch } = useFetchContainers();
  const navigate = useNavigate();

  const { client, db: sdk } = useDojoContext();
  const { waitForTransaction } = useGameContract();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const rooms = data?.dojoStarterContainerModels?.edges?.map((it: any) => ({
    ...it?.node
  }));

  const filteredRooms =
    rooms?.filter(
      (room: any) =>
        room.game_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.creator.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  console.log(filteredRooms);

  const handleRefresh = async () => {
    refetch();
    setIsLoading(true);
    await delay(3000);
    setIsLoading(false);
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
        <Button onClick={() => navigate('/create')}>Create Game</Button>
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
