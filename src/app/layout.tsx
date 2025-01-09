import './globals.css';
import { StarknetProvider } from '@/components/StarknetProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <StarknetProvider>
      <Outlet />
      <Toaster />
    </StarknetProvider>
  );
}
