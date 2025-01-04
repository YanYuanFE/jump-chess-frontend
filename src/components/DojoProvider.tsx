'use client';
import { init, SDK } from '@dojoengine/sdk';
import { setupWorld } from '@/dojo/typescript/contracts.gen';
import { dojoConfig } from '@/constants/dojoConfig';
import { createContext, useContext, useMemo } from 'react';
import { Account } from 'starknet';
import { DojoProvider } from '@dojoengine/core';
import { useQuery } from '@tanstack/react-query';
import { DojoStarterSchemaType, schema } from '@/dojo/typescript/models.gen';

/**
 * Interface defining the shape of the Dojo context.
 */
interface DojoContextType {
  /** The master account used for administrative operations */
  masterAccount: Account;
  /** The Dojo client instance */
  client: ReturnType<typeof setupWorld>;
  db: SDK<DojoStarterSchemaType> | undefined;
  /** The current burner account information */
  //   account: BurnerAccount;
}

/**
 * React context for sharing Dojo-related data throughout the application.
 */
export const DojoContext = createContext<DojoContextType | null>(null);

export const DojoContainer = ({ children, db }: { children: React.ReactNode; db: SDK<DojoStarterSchemaType> }) => {
  //   const { data } = useQuery({
  //     queryKey: ['dojo'],
  //     queryFn: async () => {
  //       const db = await init<DojoStarterSchemaType>(
  //         {
  //           client: {
  //             //             rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia",
  //             //   toriiUrl: "https://api.cartridge.gg/x/ryosepolia2/torii/graphql",
  //             //   toriiWsUrl: "wss://api.cartridge.gg/x/ryosepolia2/torii/graphql/ws",
  //             rpcUrl: dojoConfig.rpcUrl,
  //             toriiUrl: dojoConfig.toriiUrl,
  //             relayUrl: dojoConfig.relayUrl,
  //             worldAddress: dojoConfig.manifest.world.address
  //           },
  //           // Those values are used
  //           domain: {
  //             name: 'MyDojoProject',
  //             version: '1.0',
  //             chainId: 'SEPOLIA',
  //             revision: '1'
  //           }
  //         },
  //         schema
  //       );
  //       return db;
  //     }
  //   });

  const dojoProvider = new DojoProvider(dojoConfig.manifest, dojoConfig.rpcUrl);

  //   const masterAccount = useMemo(
  //     () => new Account(dojoProvider.provider, dojoConfig.masterAddress, dojoConfig.masterPrivateKey, '1'),
  //     []
  //   );

  //   console.log(data);

  console.log(db, 'dd');

  //   return <div>123{children}</div>;

  return (
    <DojoContext.Provider
      value={{
        // masterAccount,
        client: setupWorld(dojoProvider),
        db: db
        //   account: {
        //       ...burnerManagerData,
        //       account: burnerManagerData.account || masterAccount,
        //   },
      }}
    >
      {children}
    </DojoContext.Provider>
  );
};

export const useDojoContext = () => {
  const context = useContext(DojoContext);
  if (!context) {
    throw new Error('useDojoContext must be used within a DojoProvider');
  }
  return context;
};
