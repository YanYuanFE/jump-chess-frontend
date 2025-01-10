import './globals.css';
import { StarknetProvider } from '@/components/StarknetProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';

export default function RootLayout() {
  return (
    <StarknetProvider>
      <Header />
      <div className="h-[calc(100vh-60px)]">
        <Outlet />
        <Toaster />
      </div>
    </StarknetProvider>
  );
}
