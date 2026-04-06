import { formOptions, useForm, type AnyFieldApi } from '@tanstack/react-form';
import {
  ResetPasswordSchema,
  type ResetPasswordSchemaType,
} from '../../schemas';
import { Button, FieldInfo } from '#/components/ui';
import { PasswordInput } from '#/components/ui/PasswordInput';
import { submitResetPassword } from '#/services';
import { useState } from 'react';
import { CenteredLayout } from '../CenteredLayout';
import { Link } from '@tanstack/react-router';
import { Route } from '#/routes/_auth/reset-password';

const defaultValues: ResetPasswordSchemaType = {
  newPassword: '',
  confirmPassword: '',
};

const formOpts = formOptions({ defaultValues });

export const ResetPasswordForm = () => {
  const { token } = Route.useSearch();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    ...formOpts,
    validators: { onSubmit: ResetPasswordSchema },
    onSubmit: async ({ value }) => {
      setServerError(null);
      const result = await submitResetPassword({
        token,
        newPassword: value.newPassword,
      });

      if (result?.errors?.length) {
        setServerError(result.errors[0].message);
        return;
      }

      setSuccess(true);
    },
  });

  if (!token) {
    return (
      <CenteredLayout>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1F1F27] mb-2">
              Недействительная ссылка
            </h1>
            <p className="text-sm text-[#81869A] text-pretty leading-relaxed">
              Ссылка для сброса пароля недействительна или истекла
            </p>
          </div>
          <Link
            to="/recover"
            className="w-full bg-[#EEF4FF] text-[#31A0F0] py-3 px-4 rounded-lg text-center text-sm font-medium hover:bg-[#E0EDFF] transition-colors"
          >
            Запросить новую ссылку
          </Link>
        </div>
      </CenteredLayout>
    );
  }

  if (success) {
    return (
      <CenteredLayout>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1F1F27] mb-2">
              Пароль был восстановлен
            </h1>
            <p className="text-sm text-[#81869A] text-pretty leading-relaxed">
              Перейдите на страницу авторизации, чтобы войти в систему с новым
              паролем
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

  if (serverError) {
    return (
      <CenteredLayout>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1F1F27] mb-2">
              Пароль не был восстановлен
            </h1>
            <p className="text-sm text-[#81869A] text-pretty leading-relaxed">
              По каким-то причинам мы не смогли изменить ваш пароль. Попробуйте
              ещё раз через некоторое время.
            </p>
          </div>
          <Link
            to="/login"
            className="w-full bg-[#EEF4FF] text-[#31A0F0] py-3 px-4 rounded-lg text-center text-sm font-medium hover:bg-[#E0EDFF] transition-colors"
          >
            Назад в авторизацию
          </Link>
          <button
            onClick={() => setServerError(null)}
            className="text-[#31A0F0] text-sm text-center"
          >
            Попробовать заново
          </button>
        </div>
      </CenteredLayout>
    );
  }

  return (
    <CenteredLayout>
      <div className="flex flex-col gap-5 sm:gap-6">
        <div>
          <h1 className="text-xl font-semibold text-[#1F1F27] sm:text-2xl mb-2">
            Задайте пароль
          </h1>
          <p className="text-xs text-[#81869A] text-pretty leading-relaxed sm:text-sm">
            Напишите новый пароль, который будете использовать для входа
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
            name="newPassword"
            children={(field: AnyFieldApi) => (
              <div>
                <PasswordInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Введите пароль"
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="confirmPassword"
            children={(field: AnyFieldApi) => (
              <div>
                <PasswordInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Повторите пароль"
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="mt-4">
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!canSubmit || isSubmitting}
                >
                  Изменить пароль
                </Button>
              </div>
            )}
          />
        </form>
      </div>
    </CenteredLayout>
  );
};
