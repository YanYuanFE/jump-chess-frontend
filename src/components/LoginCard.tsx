'use client';
import { ConnectWallet } from '@/components/ConnectWallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccount } from '@starknet-react/core';

export function LoginPage() {
  const { address } = useAccount();

  // useEffect(() => {
  //   if (!address) {
  //     redirect('/login');
  //   } else {
  //     redirect('/game');
  //   }
  // }, [address]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to start the game</CardDescription>
        </CardHeader>
        <CardContent>
          <ConnectWallet />
        </CardContent>
      </Card>
    </div>
  );
}
