import { z } from 'zod';

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'Пароль должен содержать не менее 8 символов' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
