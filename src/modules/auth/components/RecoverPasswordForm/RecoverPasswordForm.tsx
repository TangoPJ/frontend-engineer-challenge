import { formOptions, useForm, type AnyFieldApi } from '@tanstack/react-form';
import {
  RecoverPasswordSchema,
  type RecoverPasswordSchemaType,
} from '../../schemas';
import { Button, FieldInfo, Input } from '#/components/ui';
import { submitRecover } from '#/services';
import { useState } from 'react';
import { CenteredLayout } from '../CenteredLayout';
import { Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';

const defaultUser: RecoverPasswordSchemaType = { email: '' };

const formOpts = formOptions({
  defaultValues: defaultUser,
});

export const RecoverPasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    ...formOpts,
    validators: {
      onChange: RecoverPasswordSchema,
    },

    onSubmit: async ({ value }) => {
      setServerError(null);

      const result = (await submitRecover({
        email: value.email,
      })) as {
        data?: { requestPasswordReset?: { success: boolean } };
        errors?: { message: string }[];
      };

      if (result?.errors?.length) {
        setServerError(result.errors[0].message);
        return;
      }

      setSuccess(true);
      form.reset();
    },
  });

  if (success) {
    return (
      <CenteredLayout>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1F1F27] mb-2">
              Проверьте свою почту
            </h1>
            <p className="text-sm text-[#81869A] text-pretty leading-relaxed">
              Мы отправили на почту письмо с ссылкой для восстановления пароля
            </p>
          </div>
          <Link
            to="/login"
            className="w-full bg-[#EEF4FF] text-[#31A0F0] py-3 px-4 rounded-lg text-center text-sm font-medium hover:bg-[#E0EDFF] transition-colors"
          >
            Назад в авторизацию
          </Link>
        </div>
      </CenteredLayout>
    );
  }

  return (
    <CenteredLayout>
      <div className="flex flex-col gap-5 sm:gap-6">
        <div>
          <div className="mb-2 flex items-start gap-1 sm:mb-3 sm:items-center sm:gap-2">
            <Link
              to="/login"
              className="-ml-1 flex size-11 shrink-0 items-center justify-center rounded-md text-[#1F1F27] transition-colors hover:bg-[#1F1F2708] hover:text-[#31A0F0] sm:-ml-0 sm:size-10 sm:p-1"
              aria-label="Назад ко входу"
            >
              <ChevronLeft
                className="size-7 sm:size-8"
                strokeWidth={1.75}
                aria-hidden
              />
            </Link>
            <h1 className="min-w-0 pt-1.5 text-xl font-semibold leading-snug text-[#1F1F27] sm:pt-0 sm:text-2xl sm:leading-tight">
              Восстановление пароля
            </h1>
          </div>
          <p className="text-pretty text-xs leading-relaxed text-[#81869A] sm:text-sm">
            Укажите адрес почты на который был зарегистрирован аккаунт
          </p>
        </div>

        <form
          className="flex flex-col gap-4 sm:gap-5"
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            void form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            children={(field: AnyFieldApi) => (
              <div>
                <Input
                  id={field.name}
                  name={field.name}
                  label="E-mail"
                  invalid={field.state.meta.errors.length > 0}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="name@mail.com"
                  autoComplete="email"
                  autoFocus
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="mt-4 flex w-full flex-col gap-3">
                <Button
                  type="submit"
                  variant="secondary"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? '...' : 'Восстановить пароль'}
                </Button>
                {serverError && (
                  <span
                    role="alert"
                    className="w-full text-balance px-1 text-center text-xs text-[var(--color-error)] sm:text-sm"
                  >
                    {serverError}
                  </span>
                )}
              </div>
            )}
          />
        </form>
      </div>
    </CenteredLayout>
  );
};
