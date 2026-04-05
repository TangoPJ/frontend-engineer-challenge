interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  invalid?: boolean;
}

const fieldBase =
  'h-12 w-full rounded-t-md border-0 border-b-2 bg-white px-3 pb-2 pt-2.5 text-base text-[#1F1F27] outline-none transition-[color,border-color] placeholder:text-[#81869A] sm:h-14 sm:px-4';

const borderOk = 'border-[#31A0F0] focus:border-[#31A0F0]';
const borderErr =
  'border-[var(--color-error)] focus:border-[var(--color-error)]';

export const Input = ({ label, invalid, className, ...props }: InputProps) => (
  <div className="flex flex-col gap-1.5 sm:gap-2">
    {label && (
      <label
        htmlFor={props.id}
        className="text-xs font-medium text-[#81869A] sm:text-sm"
      >
        {label}
      </label>
    )}
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={`${fieldBase} ${invalid ? borderErr : borderOk} ${className ?? ''}`.trim()}
    />
  </div>
);
