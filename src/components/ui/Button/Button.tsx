import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  children?: ReactNode;
};

export const Button = ({
  children,
  variant = 'primary',
  loading = false,
  className = '',
  ...props
}: ButtonProps) => {
  const variantClass =
    variant === 'secondary'
      ? 'bg-[#EBF5FC] text-[#31A0F0] enabled:hover:bg-[#D8EBF8] enabled:hover:text-[#268CD4]'
      : 'bg-[#31A0F0] text-white enabled:hover:bg-[#268CD4]';

  return (
    <button
      aria-busy={loading || undefined}
      className={`inline-flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base ${variantClass} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2
            className="size-5 shrink-0 animate-spin sm:size-6"
            strokeWidth={2.25}
            aria-hidden
          />
          <span className="sr-only">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
