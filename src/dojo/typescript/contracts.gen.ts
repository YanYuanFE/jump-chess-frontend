import { DojoProvider } from '@dojoengine/core';
import { Account } from 'starknet';
import * as models from './models.gen';

export function setupWorld(provider: DojoProvider) {
  const actions_createGame = async (snAccount: Account) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: 'actions',
          entrypoint: 'create_game',
          calldata: []
        },
        'dojo_starter'
      );
    } catch (error) {
      console.error(error);
    }
  };

  const actions_joiningGame = async (snAccount: Account, gameId: number) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: 'actions',
          entrypoint: 'joining_game',
          calldata: [gameId]
        },
        'dojo_starter'
      );
    } catch (error) {
      console.error(error);
    }
  };

  const actions_move = async (snAccount: Account, from: number, to: number, gameId: number) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: 'actions',
          entrypoint: 'move',
          calldata: [from, to, gameId]
        },
        'dojo_starter'
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    actions: {
      createGame: actions_createGame,
      joiningGame: actions_joiningGame,
      move: actions_move
    }
  };
}
