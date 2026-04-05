import { createFileRoute } from '@tanstack/react-router';
import { ResetPasswordForm } from '#/modules/auth/components';
import { z } from 'zod';

const searchSchema = z.object({
  token: z.string().catch(''),
});

export const Route = createFileRoute('/_auth/reset-password')({
  validateSearch: searchSchema,
  component: ResetPasswordForm,
});
