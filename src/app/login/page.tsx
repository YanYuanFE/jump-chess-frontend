'use client';
import { ConnectWallet } from '@/components/ConnectWallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccount } from '@starknet-react/core';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { address } = useAccount();

  console.log(address, 'aaa');

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
          <CardTitle>登录</CardTitle>
          <CardDescription>登录后开始游戏</CardDescription>
        </CardHeader>
        <CardContent>
          <ConnectWallet />
        </CardContent>
      </Card>
    </div>
  );
}
