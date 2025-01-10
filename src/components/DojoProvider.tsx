'use client';
import { init, SDK } from '@dojoengine/sdk';
import { setupWorld } from '@/dojo/typescript/contracts.gen';
import { dojoConfig } from '@/constants/dojoConfig';
import { createContext, useContext, useMemo } from 'react';
import { Account } from 'starknet';
import { DojoProvider } from '@dojoengine/core';
import { useQuery } from '@tanstack/react-query';
import { SchemaType, schema } from '@/dojo/typescript/models.gen';

/**
 * Interface defining the shape of the Dojo context.
 */
interface DojoContextType {
  /** The master account used for administrative operations */
  //   masterAccount: Account;
  /** The Dojo client instance */
  client: ReturnType<typeof setupWorld>;
  db: SDK<SchemaType> | undefined;
  /** The current burner account information */
  //   account: BurnerAccount;
}

/**
 * React context for sharing Dojo-related data throughout the application.
 */
export const DojoContext = createContext<DojoContextType | null>(null);

export const DojoContainer = ({ children, db }: { children: React.ReactNode; db: SDK<SchemaType> }) => {
  const dojoProvider = new DojoProvider(dojoConfig.manifest, dojoConfig.rpcUrl);

  //   const masterAccount = useMemo(
  //     () => new Account(dojoProvider.provider, dojoConfig.masterAddress, dojoConfig.masterPrivateKey, '1'),
  //     []
  //   );
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
