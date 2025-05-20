import './globals.css';
import { StarknetProvider } from '@/components/StarknetProvider';
import { Toaster } from '@/components/ui/sonner';
import { Outlet } from 'react-router-dom';
import { Layout } from '@/components/Layout';

export default function RootLayout() {
  return (
    <StarknetProvider>
      <Layout>
        <Outlet />
      </Layout>
      <Toaster richColors />
    </StarknetProvider>
  );
}
