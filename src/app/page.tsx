'use client';
import { GameRoomList } from '@/components/GameRoomList';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <main className="container p-6">
      <Header />
      <div>
        <GameRoomList />
      </div>
    </main>
  );
}
