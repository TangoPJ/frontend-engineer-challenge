import type { AnyFieldApi } from '@tanstack/react-form';

export const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
  return (
    <>
      {field.state.meta.errors.length > 0 && (
        <ul className="mt-1 space-y-0.5" role="alert">
          {field.state.meta.errors.map((e: any, i) => (
            <li
              key={i}
              className="break-words text-xs text-[var(--color-error)] sm:text-sm"
            >
              {e?.message}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
