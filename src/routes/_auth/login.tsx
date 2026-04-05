import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '#/modules/auth/components';

export const Route = createFileRoute('/_auth/login')({ component: LoginForm });
