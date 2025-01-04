'use client';

import { Chain, mainnet, sepolia } from '@starknet-react/chains';
import { argent, jsonRpcProvider, publicProvider, StarknetConfig, starkscan } from '@starknet-react/core';
import { PropsWithChildren } from 'react';
import ControllerConnector from '@cartridge/connector/controller';
import { Policy } from '@cartridge/controller';
import { globalConfig } from '@/constants';

export const ETH_CONTRACT_ADDRESS = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
export const STRK_CONTRACT_ADDRESS = '0x03e1e1d591567a0268ce4f39e3dba774fd510cbea4cc428eff947d424375d225';

const policies: Policy[] = [
  {
    target: STRK_CONTRACT_ADDRESS,
    method: 'create_game'
  },
  {
    target: STRK_CONTRACT_ADDRESS,
    method: 'joining_game'
  },
  {
    target: STRK_CONTRACT_ADDRESS,
    method: 'move'
  }
];

const controller = new ControllerConnector({
  policies,
  rpc: globalConfig.RPC_SEPOLIA,
  url: globalConfig.KEYCHAIN_FRAME_URL,
  profileUrl: globalConfig.PROFILE_FRAME_URL,
  slot: 'profile-example',
  preset: 'cartidge',
  namespace: 'dopewars',
  tokens: {
    erc20: [
      // $LORDS
      '0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49'
      // $FLIP
      // "0x01bfe97d729138fc7c2d93c77d6d1d8a24708d5060608017d9b384adf38f04c7",
    ]
  }
});

export function StarknetProvider({ children }: PropsWithChildren) {
  return (
    <StarknetConfig
      autoConnect
      chains={[sepolia]}
      connectors={[controller, argent()]}
      explorer={starkscan}
      provider={jsonRpcProvider({
        rpc: (chain: Chain) => {
          switch (chain) {
            case mainnet:
              return { nodeUrl: globalConfig.RPC_MAINNET };
            case sepolia:
            default:
              return { nodeUrl: globalConfig.RPC_SEPOLIA };
          }
        }
      })}
    >
      {children}
    </StarknetConfig>
  );
}
