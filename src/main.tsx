import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '#/lib/auth';
import { router, queryClient } from './router';
import './styles.css';

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
