import { formOptions, useForm, type AnyFieldApi } from '@tanstack/react-form';
import { RegisterUserSchema, type RegisterUserSchemaType } from '../../schemas';
import { Button, FieldInfo, Input, PasswordInput } from '#/components/ui';
import { submitRegister } from '#/services';
import { useState } from 'react';
import { AuthLayout } from '../AuthLayout';
import { Link, useNavigate } from '@tanstack/react-router';

const defaultUser: RegisterUserSchemaType = {
  email: '',
  password: '',
  confirmPassword: '',
};

const formOpts = formOptions({
  defaultValues: defaultUser,
});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    ...formOpts,
    validators: {
      onSubmit: RegisterUserSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      const result = (await submitRegister({
        email: value.email,
        password: value.password,
      })) as {
        data?: { register?: { userId: string } };
        errors?: { message: string }[];
      };

      if (result?.errors?.length) {
        setServerError(result.errors[0].message);
        return;
      }

      navigate({ to: '/login' });
    },
  });

  return (
    <AuthLayout
      footer={
        <>
          <span className="text-[#81869A]">Уже есть аккаунт? </span>
          <Link
            to="/login"
            className="text-[#31A0F0] transition-colors hover:text-[#268CD4]"
          >
            Войти
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
          Регистрация в системе
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
                autoComplete="new-password"
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
                label="Повторите пароль"
                invalid={field.state.meta.errors.length > 0}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                autoComplete="new-password"
                placeholder="Повторите пароль "
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
                loading={isSubmitting}
                disabled={!canSubmit || isSubmitting}
              >
                Зарегистрироваться
              </Button>
              {serverError && (
                <span
                  className="w-full text-balance px-1 text-center text-xs text-[var(--color-error)] sm:text-sm"
                  role="alert"
                >
                  {serverError}
                </span>
              )}
            </div>
          )}
        />
      </form>
    </AuthLayout>
  );
};
