import { createDojoConfig } from '@dojoengine/core';

import manifest from '../abi/manifest_dev.json';

export const dojoConfig = createDojoConfig({
  manifest
});
