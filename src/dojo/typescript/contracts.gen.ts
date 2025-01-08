import { DojoProvider } from '@dojoengine/core';
import { Account, AccountInterface, BigNumberish, CairoOption, CairoCustomEnum, ByteArray } from 'starknet';
import * as models from './models.gen';

export function setupWorld(provider: DojoProvider) {
  const actions_createGame = async (snAccount: Account | AccountInterface) => {
    console.log(provider, snAccount, 'ss');
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

  const actions_joiningGame = async (snAccount: Account | AccountInterface, gameId: BigNumberish) => {
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

  const actions_move = async (
    snAccount: Account | AccountInterface,
    from: BigNumberish,
    to: BigNumberish,
    gameId: BigNumberish
  ) => {
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
