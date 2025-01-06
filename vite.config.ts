import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';
import mkcert from 'vite-plugin-mkcert';

// import { nodePolyfills } from 'vite-plugin-node-polyfills';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mkcert(),
    react(),
    wasm(),
    topLevelAwait()
    // nodePolyfills({
    //   include: ['crypto'],
    //   globals: {
    //     Buffer: true,
    //     global: true,
    //     process: true
    //   },
    //   protocolImports: true
    // })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    // https: true
    // host: '127.0.0.1',
  }
});
