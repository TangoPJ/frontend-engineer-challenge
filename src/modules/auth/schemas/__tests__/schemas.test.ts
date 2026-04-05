import { describe, it, expect } from 'vitest';
import {
  LoginUserSchema,
  RegisterUserSchema,
  RecoverPasswordSchema,
  ResetPasswordSchema,
} from '../index';

describe('LoginUserSchema', () => {
  it('rejects invalid email', () => {
    const result = LoginUserSchema.safeParse({
      email: 'notanemail',
      password: '12345678',
    });
    expect(result.success).toBe(false);
  });

  it('rejects password shorter than 8 characters', () => {
    const result = LoginUserSchema.safeParse({
      email: 'test@mail.com',
      password: '123',
    });
    expect(result.success).toBe(false);
  });

  it('passes valid data', () => {
    const result = LoginUserSchema.safeParse({
      email: 'test@mail.com',
      password: '12345678',
    });
    expect(result.success).toBe(true);
  });
});

describe('RegisterUserSchema', () => {
  it('rejects mismatched passwords', () => {
    const result = RegisterUserSchema.safeParse({
      email: 'test@mail.com',
      password: '12345678',
      confirmPassword: 'different',
    });
    expect(result.success).toBe(false);
  });

  it('passes valid data', () => {
    const result = RegisterUserSchema.safeParse({
      email: 'test@mail.com',
      password: '12345678',
      confirmPassword: '12345678',
    });
    expect(result.success).toBe(true);
  });
});

describe('RecoverPasswordSchema', () => {
  it('rejects invalid email', () => {
    const result = RecoverPasswordSchema.safeParse({ email: 'notanemail' });
    expect(result.success).toBe(false);
  });
});

describe('ResetPasswordSchema', () => {
  it('rejects mismatched passwords', () => {
    const result = ResetPasswordSchema.safeParse({
      newPassword: '12345678',
      confirmPassword: 'different',
    });
    expect(result.success).toBe(false);
  });

  it('rejects password shorter than 8 characters', () => {
    const result = ResetPasswordSchema.safeParse({
      newPassword: '123',
      confirmPassword: '123',
    });
    expect(result.success).toBe(false);
  });
});
