type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button = ({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  const variantClass =
    variant === 'secondary'
      ? 'bg-[#EBF5FC] text-[#31A0F0] enabled:hover:bg-[#D8EBF8] enabled:hover:text-[#268CD4]'
      : 'bg-[#31A0F0] text-white enabled:hover:bg-[#268CD4]';

  return (
    <button
      className={`w-full cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base ${variantClass}`}
      {...props}
    >
      {children}
    </button>
  );
};
