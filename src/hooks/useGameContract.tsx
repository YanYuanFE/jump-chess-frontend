import { useAccount, useContract, useNetwork, useProvider } from '@starknet-react/core';
import { GameABI } from '@/abi/game';
import { STRK_CONTRACT_ADDRESS } from '@/components/StarknetProvider';
import { toast } from 'sonner';

export const useGameContract = () => {
  const { account } = useAccount();
  const { provider } = useProvider();
  const network = useNetwork();

  const { contract } = useContract({
    abi: GameABI,
    address: STRK_CONTRACT_ADDRESS,
    provider: provider
  });

  contract?.connect(account!);

  const waitForTransaction = async (hash: any) => {
    toast.success('Transaction has been submitted');

    const recipient = await provider.waitForTransaction(hash);

    if ((recipient as any)?.execution_status === 'SUCCEEDED') {
      toast.success('Transaction has been confirmed');
    } else {
      toast.error('Transaction has failed');
    }
    const events = contract?.parseEvents(recipient);
    console.log(events, 'ee');
    return recipient;
  };

  const createGame = async () => {
    const call = contract?.populate('create_game');
    const res = await contract?.create_game(call!.calldata!);
    const result = await waitForTransaction(res?.transaction_hash);

    console.log(result);
    return result;
  };

  const joinGame = async (id: number) => {
    const call = contract?.populate('joining_game', [id]);
    const res = await contract?.joining_game(call!.calldata!);
    await waitForTransaction(res?.transaction_hash);
  };

  const move = async (from: number, to: number, id: number) => {
    const call = contract?.populate('move', [from, to, id]);
    const res = await contract?.move(call!.calldata!);
    await waitForTransaction(res?.transaction_hash);
  };

  return {
    createGame,
    joinGame
  };
};
