import { formOptions, useForm, type AnyFieldApi } from '@tanstack/react-form';
import { LoginUserSchema, type LoginUserSchemaType } from '../../schemas';
import { Button, FieldInfo, Input, PasswordInput } from '#/components/ui';
import { submitLogin } from '#/services';
import { useState } from 'react';
import { AuthLayout } from '../AuthLayout';
import { Link } from '@tanstack/react-router';
import { useAuth } from '#/lib/auth';

const defaultUser: LoginUserSchemaType = { email: '', password: '' };

const formOpts = formOptions({
  defaultValues: defaultUser,
});

export const LoginForm = () => {
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    ...formOpts,

    validators: { onSubmit: LoginUserSchema },

    onSubmit: async ({ value }) => {
      setServerError(null);

      const result = (await submitLogin({
        email: value.email,
        password: value.password,
      })) as {
        data?: { login?: { accessToken: string } };
        errors?: { message: string }[];
      };

      if (result?.errors?.length) {
        setServerError(result.errors[0].message);
        return;
      }

      if (result?.data?.login?.accessToken) {
        login(result.data.login.accessToken);
      }
    },
  });

  return (
    <AuthLayout
      footer={
        <>
          <span className="text-[#81869A]">Еще не зарегистрированы? </span>
          <Link
            to="/register"
            className="text-[#31A0F0] transition-colors hover:text-[#268CD4]"
          >
            Регистрация
          </Link>
        </>
      }
    >
      <form
        className="flex flex-col gap-4 sm:gap-5"
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <h1 className="text-2xl font-semibold leading-tight text-[#1F1F27] sm:text-[28px] sm:leading-snug">
          Войти в систему
        </h1>

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

        <form.Field
          name="password"
          children={(field: AnyFieldApi) => (
            <div>
              <PasswordInput
                id={field.name}
                name={field.name}
                label="Пароль"
                invalid={field.state.meta.errors.length > 0}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                autoComplete="current-password"
                placeholder="Введите пароль"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        {serverError && (
          <p
            className="text-pretty text-xs leading-snug text-[var(--color-error)] sm:text-sm"
            role="alert"
          >
            {serverError}
          </p>
        )}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="mt-4 flex w-full flex-col gap-3">
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={!canSubmit || isSubmitting}
              >
                Войти
              </Button>
            </div>
          )}
        />
        <Link
          to="/recover"
          className="block w-full py-2 text-center text-sm text-[#31A0F0] transition-colors hover:text-[#268CD4] sm:text-base"
        >
          Забыли пароль?
        </Link>
      </form>
    </AuthLayout>
  );
};
