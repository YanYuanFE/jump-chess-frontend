import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GamepadIcon } from 'lucide-react';
import { DisconnectModal } from './DisconnectModal';
import { ConnectWallet } from './ConnectWallet';
import { useAccount } from '@starknet-react/core';
import { ScrollArea } from './ui/scroll-area';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { address } = useAccount();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Leaderboard', href: '/leaderboard' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img src="./logo.png" className="h-8 w-8 text-game-blue" />
                <span className="ml-2 text-xl font-bold text-gray-900">Jump Well Chess</span>
              </Link>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {address &&
                  navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        location.pathname === item.href
                          ? 'border-game-blue text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
            </div>
            <div className="flex items-center">{address ? <DisconnectModal /> : <ConnectWallet />}</div>
          </div>
        </div>

        {/* Mobile navigation */}
        {address && (
          <div className="md:hidden border-t border-gray-200">
            <div className="flex justify-between px-4 py-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-md ${
                    location.pathname === item.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <main className="h-[calc(100vh-64px)]">{children}</main>
      </ScrollArea>
    </div>
  );
};
