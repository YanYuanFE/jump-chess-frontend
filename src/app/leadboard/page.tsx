'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { QueryBuilder, SchemaType } from '@dojoengine/sdk';
import { useDojoContext } from '@/components/DojoProvider';
import { shortenAddress } from '@/lib/utils';

interface LeaderboardEntry {
  rank: number;
  address: string;
  wins: number;
}

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { db: sdk } = useDojoContext();

  const fetchEntities = async () => {
    const query = new QueryBuilder<SchemaType>()
      .namespace('dojo_starter', (n) =>
        n.entity('Container', (e) => {
          return e.gte('status', 2);
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
            const winners = resp.data?.map((it: any) => it.models.dojo_starter?.Container.winner);
            // winners是一个地址数组，统计每个地址的出现次数，处理为LeaderboardEntry
            const leaderboard: LeaderboardEntry[] = [];
            const addressCounts: Record<string, number> = {};
            winners.forEach((address) => {
              addressCounts[address] = (addressCounts[address] || 0) + 1;
            });
            Object.keys(addressCounts).forEach((address, index) => {
              leaderboard.push({
                rank: index + 1,
                address,
                wins: addressCounts[address]
              });
            });
            const containers = leaderboard.sort((a, b) => b.wins - a.wins);
            setLeaderboard(containers);
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

  const filteredLeaderboard = leaderboard.filter((entry) =>
    entry.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEmojiForRank = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🏅';
    }
  };

  return (
    <div className="container mx-auto py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8"
      >
        🏆 Leaderboard 🏆
      </motion.h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mx-auto"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Wins</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeaderboard.map((entry, index) => (
              <motion.tr
                key={entry.address}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TableCell className="font-medium">
                  {getEmojiForRank(entry.rank)} {entry.rank}
                </TableCell>
                <TableCell>{shortenAddress(entry.address)}</TableCell>
                <TableCell className="text-right">
                  {entry.wins} {entry.wins > 100 ? '🔥' : ''}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredLeaderboard.length === 0 && <p className="text-center mt-4 text-gray-500">No matching entries found</p>}
    </div>
  );
}
