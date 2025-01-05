import { useAccount } from '@starknet-react/core';
import { ConnectWallet } from './ConnectWallet';
import { DisconnectModal } from './DisconnectModal';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  return (
    <header className="flex justify-between h-[60px] px-6 items-center">
      <h1 className="text-2xl font-bold cusor-pointer" onClick={() => navigate('/')}>
        Jump Well Chess
      </h1>

      {address ? <DisconnectModal /> : <ConnectWallet />}
    </header>
  );
};
