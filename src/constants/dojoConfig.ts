import { createDojoConfig } from '@dojoengine/core';

import manifest from '../abi/manifest_dev.json';
import { globalConfig } from '.';

export const dojoConfig = createDojoConfig({
  manifest,
  rpcUrl: globalConfig.RPC_SEPOLIA,
  toriiUrl: globalConfig.toriiUrl
});
