import { z } from 'zod';

export const RecoverPasswordSchema = z.object({
  email: z.email({ message: 'Недопустимый адрес почты' }),
});

export type RecoverPasswordSchemaType = z.infer<typeof RecoverPasswordSchema>;
