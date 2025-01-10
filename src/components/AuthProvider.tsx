'use client';
import ControllerConnector from '@cartridge/connector/controller';
import { useAccount, useConnect } from '@starknet-react/core';
import { useEffect, useState } from 'react';
import { LoginPage } from './LoginCard';
import { useDojoContext } from './DojoProvider';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { connect, connectors } = useConnect();
  const { address } = useAccount();

  const controller = connectors[0] as ControllerConnector;
  const [username, setUsername] = useState<string>();
  // const { client, db, masterAccount } = useDojoContext();
  // console.log(client, db, masterAccount);

  useEffect(() => {
    if (!address) return;
    controller.username()?.then((n) => setUsername(n));
  }, [address, controller]);

  if (!address) {
    return <LoginPage />;
  }

  return <>{children}</>;
};
