import { RegisterForm } from '#/modules/auth/components/RegisterForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/register')({
  component: RegisterForm,
});
