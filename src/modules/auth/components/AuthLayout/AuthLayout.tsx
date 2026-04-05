import { Logo } from '#/components/ui/Logo';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  footer: ReactNode;
}

export const AuthLayout = ({ children, footer }: AuthLayoutProps) => (
  <div className="flex min-h-dvh flex-col bg-white md:h-dvh md:flex-row">
    <div className="flex min-h-0 w-full min-w-0 flex-col bg-white md:w-[40%] md:shrink-0">
      <header className="shrink-0 px-4 py-4 sm:p-5">
        <Logo />
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 md:py-4">
        <div className="w-full max-w-[400px]">{children}</div>
      </main>
      {footer && (
        <footer className="flex shrink-0 flex-col items-stretch">
          <div className="mx-4 h-px bg-[#1F1F2714] sm:mx-5" />
          <div className="px-4 py-4 text-center text-xs leading-snug text-balance sm:py-5 sm:text-sm">
            {footer}
          </div>
        </footer>
      )}
    </div>
    <aside
      className="relative hidden h-full min-h-0 shrink-0 overflow-hidden bg-[#E9EFF4] md:flex md:w-[60%] md:flex-col"
      aria-hidden
    >
      <div className="flex size-full min-h-0 items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
        <img
          src="/bubble.svg"
          alt=""
          className="h-auto w-auto max-h-full max-w-full object-contain object-center select-none"
          draggable={false}
        />
      </div>
    </aside>
  </div>
);
