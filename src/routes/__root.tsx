import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
  queryClient: QueryClient;
  auth: {
    isAuthenticated: boolean;
    token: string | null;
  };
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
});
