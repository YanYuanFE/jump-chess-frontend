import { useAccount } from '@starknet-react/core';
import { ConnectWallet } from './ConnectWallet';
import { DisconnectModal } from './DisconnectModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const menus = [
  {
    name: 'Lobby',
    path: '/'
  },
  {
    name: 'Leadboard',
    path: '/leadboard'
  }
];

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { pathname } = useLocation();
  return (
    <nav className={cn('md:flex pl-8 flex-1 items-center space-x-8 hidden', className)} {...props}>
      {menus.map((menu) => {
        return (
          <Link
            to={menu.path}
            key={menu.path}
            className={cn(
              'text-md font-medium transition-colors hover:text-primary',
              pathname === menu.path ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {menu.name}
          </Link>
        );
      })}
    </nav>
  );
}

export const Header = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  return (
    <header className="flex justify-between h-[60px] px-6 items-center">
      <div className="flex gap-6 items-center">
        <h1 className="text-2xl font-bold cusor-pointer" onClick={() => navigate('/')}>
          Jump Well Chess
        </h1>

        <MainNav />
      </div>

      {address ? <DisconnectModal /> : <ConnectWallet />}
    </header>
  );
};
