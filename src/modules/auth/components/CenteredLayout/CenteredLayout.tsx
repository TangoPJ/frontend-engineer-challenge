import { Logo } from '#/components/ui/Logo';
import type { ReactNode } from 'react';

interface CenteredLayoutProps {
  children: ReactNode;
}

export const CenteredLayout = ({ children }: CenteredLayoutProps) => (
  <div className="flex min-h-dvh flex-col bg-white">
    <header className="shrink-0 px-4 py-4 sm:p-5">
      <Logo />
    </header>

    <main className="flex min-h-0 flex-1 flex-col items-center justify-start px-4 pb-8 pt-2 sm:justify-center sm:px-6 sm:pb-12 sm:pt-0">
      <div className="w-full max-w-[400px] py-2 sm:py-0">{children}</div>
    </main>
  </div>
);
