import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '@/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DojoContainer } from './components/DojoProvider';
import { init } from '@dojoengine/sdk';
import { SchemaType, schema } from './dojo/typescript/models.gen';
import { dojoConfig } from './constants/dojoConfig';
import { globalConfig } from './constants';

console.log(dojoConfig, 'dd');

async function main() {
  const db = await init<SchemaType>(
    {
      client: {
        //             rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia",
        //   toriiUrl: "https://api.cartridge.gg/x/ryosepolia2/torii/graphql",
        //   toriiWsUrl: "wss://api.cartridge.gg/x/ryosepolia2/torii/graphql/ws",
        rpcUrl: dojoConfig.rpcUrl,
        toriiUrl: dojoConfig.toriiUrl,
        relayUrl: dojoConfig.relayUrl,
        worldAddress: dojoConfig.manifest.world.address
      },
      // Those values are used
      domain: {
        name: 'MyDojoProject',
        version: '1.0',
        chainId: 'SEPOLIA',
        revision: '1'
      }
      // withLogger: true
    },
    schema
  );

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <DojoContainer db={db}>
        <Router />
      </DojoContainer>
    </React.StrictMode>
  );
}

main();
