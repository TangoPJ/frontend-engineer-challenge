import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  useRouter: () => ({ navigate: vi.fn() }),
}));

const mockLogin = vi.fn();
vi.mock('#/lib/auth', () => ({
  useAuth: () => ({ login: mockLogin }),
}));

const mockSubmitLogin = vi.fn();
vi.mock('#/services', () => ({
  submitLogin: (...args: any[]) => mockSubmitLogin(...args),
}));

vi.mock('../AuthLayout', () => ({
  AuthLayout: ({ children }: any) => <div>{children}</div>,
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls login with token on success', async () => {
    mockSubmitLogin.mockResolvedValue({
      data: { login: { accessToken: 'test-token' } },
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('name@mail.com'), {
      target: { value: 'test@mail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Введите пароль'), {
      target: { value: '12345678' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test-token');
    });
  });

  it('shows server error on failed login', async () => {
    mockSubmitLogin.mockResolvedValue({
      errors: [{ message: 'Invalid credentials' }],
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('name@mail.com'), {
      target: { value: 'test@mail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Введите пароль'), {
      target: { value: '12345678' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Invalid credentials',
      );
    });
  });

  it('disables submit button while submitting', async () => {
    mockSubmitLogin.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve({ data: { login: { accessToken: 'token' } } }),
            100,
          ),
        ),
    );

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('name@mail.com'), {
      target: { value: 'test@mail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Введите пароль'), {
      target: { value: '12345678' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /\.\.\./i })).toBeDisabled();
    });
  });
});
