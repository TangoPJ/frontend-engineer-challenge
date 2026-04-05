import { createRouter } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';

export interface RouterContext {
  queryClient: QueryClient;
  auth: {
    isAuthenticated: boolean;
    token: string | null;
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined!,
  },
  scrollRestoration: true,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
