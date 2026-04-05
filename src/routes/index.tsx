import { useAuth } from '#/lib/auth';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
  component: () => {
    const { logout } = useAuth();

    return (
      <div className="flex min-h-dvh flex-col bg-white">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[#1F1F2714] px-4 py-4 sm:px-6 sm:py-5">
          <span className="min-w-0 text-base font-medium text-[#1F1F27] sm:text-lg">
            Welcome! You are logged in.
          </span>
          <button
            type="button"
            onClick={logout}
            className="shrink-0 cursor-pointer rounded-lg bg-[#31A0F0] px-5 py-2.5 text-sm font-medium text-white transition-colors enabled:hover:bg-[#268CD4] sm:px-6 sm:py-3 sm:text-base"
          >
            Sign out
          </button>
        </header>
        <main className="min-h-0 flex-1" />
      </div>
    );
  },
});
