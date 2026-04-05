import { z } from 'zod';

export const LoginUserSchema = z.object({
  email: z.email({ message: 'Недопустимый адрес почты' }),
  password: z
    .string()
    .min(8, { message: 'Пароль должен содержать не менее 8 символов' }),
});

export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
