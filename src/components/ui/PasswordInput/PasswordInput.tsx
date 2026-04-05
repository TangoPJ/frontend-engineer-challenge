import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  invalid?: boolean;
}

const fieldBase =
  'h-12 w-full rounded-t-md border-0 border-b-2 bg-white pb-2 pl-3 pr-12 pt-2.5 text-base text-[#1F1F27] outline-none transition-[color,border-color] placeholder:text-[#81869A] sm:h-14 sm:pl-4 sm:pr-10';

const borderOk = 'border-[#31A0F0] focus:border-[#31A0F0]';
const borderErr =
  'border-[var(--color-error)] focus:border-[var(--color-error)]';

export const PasswordInput = ({
  label,
  invalid,
  className,
  ...props
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      {label && (
        <label
          htmlFor={props.id}
          className="text-xs font-medium text-[#81869A] sm:text-sm"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          type={show ? 'text' : 'password'}
          aria-invalid={invalid || undefined}
          className={`${fieldBase} ${invalid ? borderErr : borderOk} ${className ?? ''}`.trim()}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-[#C8C8C8] transition-colors duration-150 hover:bg-[#1F1F2708] hover:text-[#31A0F0] sm:right-2 sm:size-9"
          tabIndex={-1}
        >
          {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
    </div>
  );
};
