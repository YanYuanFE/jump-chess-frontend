'use client';

import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import ControllerConnector from '@cartridge/connector/controller';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useStarknetkitConnectModal } from 'starknetkit';
import { shortenAddress } from '@/lib/utils';

export function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as any,
    modalTheme: 'light'
  });

  const controller = connectors[0] as ControllerConnector;
  // const session = connectors[1] as SessionConnector;

  const [username, setUsername] = useState<string>();
  useEffect(() => {
    if (!address) return;
    controller.username()?.then((n) => setUsername(n));
  }, [address, controller]);

  const connectWallet = async () => {
    const { connector } = await starknetkitConnectModal();
    await connect({ connector: connector as any });
  };

  return (
    <div>
      {address && (
        <>
          <p>{shortenAddress(address)} </p>
          {username && <p>Username: {username}</p>}
        </>
      )}
      {address ? (
        <Button onClick={() => disconnect()}>Disconnect</Button>
      ) : (
        <div className="flex gap-1">
          <Button onClick={() => connectWallet()}>Connect</Button>
        </div>
      )}
    </div>
  );
}
