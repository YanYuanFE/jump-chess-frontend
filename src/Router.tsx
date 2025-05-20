import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './app/layout';

const routerConfig = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        async lazy() {
          const Page = await import('@/app/page');
          return { Component: Page.default };
        }
      },
      {
        path: 'rooms',
        async lazy() {
          const Page = await import('@/app/rooms/page');
          return { Component: Page.default };
        }
      },
      {
        path: 'create-room',
        async lazy() {
          const Page = await import('@/app/create-room/page');
          return { Component: Page.default };
        }
      },
      {
        path: 'leaderboard',
        async lazy() {
          const Page = await import('@/app/leadboard/page');
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
