import { z } from 'zod';

export const RegisterUserSchema = z
  .object({
    email: z.email({ message: 'Недопустимый адрес почты' }),
    password: z
      .string()
      .min(8, { message: 'Пароль должен содержать не менее 8 символов' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;
