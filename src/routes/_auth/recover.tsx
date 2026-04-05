import { RecoverPasswordForm } from '#/modules/auth/components/RecoverPasswordForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/recover')({
  component: RecoverPasswordForm,
});
