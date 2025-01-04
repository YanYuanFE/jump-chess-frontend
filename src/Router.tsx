import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import RootLayout from './app/layout';
import GameLobbyPage from '@/app/game/page';

const routerConfig = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        // element: <div>12133</div>
        async lazy() {
          const Page = await import('@/app/page');
          return { Component: Page.default };
        }
      },
      {
        path: 'create',
        // element: <div>12133</div>
        async lazy() {
          const Page = await import('@/app/game/page');
          return { Component: Page.default };
        }
      },
      {
        path: 'game/:id',
        async lazy() {
          const Page = await import('@/app/game/[id]/page');
          return { Component: Page.default };
        }
      }
    ]
  }
];

const router = createBrowserRouter(routerConfig);

export const Router = () => {
  return <RouterProvider router={router} />;
};
