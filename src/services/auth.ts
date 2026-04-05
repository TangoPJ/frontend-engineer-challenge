import { GQL_URL } from '#/lib/constants';
import type { LoginUserSchemaType } from '#/modules/auth/schemas';
import { api } from './api';

export const submitLogin = async ({ email, password }: LoginUserSchemaType) => {
  return await api
    .post(GQL_URL, {
      json: {
        query: `mutation Login($input: LoginInput!) { 
        login(input: $input) { accessToken userId } 
      }`,
        variables: { input: { email, password } },
      },
    })
    .json();
};

export const submitRegister = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await api
    .post(GQL_URL, {
      json: {
        query: `mutation Register($input: RegisterInput!) { 
        register(input: $input) { userId } 
      }`,
        variables: { input: { email, password } },
      },
    })
    .json();
};

export const submitRecover = async ({ email }: { email: string }) => {
  return await api
    .post(GQL_URL, {
      json: {
        query: `mutation RequestReset($email: String!) { 
        requestPasswordReset(email: $email) { success } 
      }`,
        variables: { email },
      },
    })
    .json();
};

export const submitResetPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  return (await api
    .post(GQL_URL, {
      json: {
        query: `mutation ResetPassword($input: ResetPasswordInput!) {
        resetPassword(input: $input) { success }
      }`,
        variables: { input: { token, newPassword } },
      },
    })
    .json()) as {
    data?: { resetPassword?: { success: boolean } };
    errors?: { message: string }[];
  };
};

export const submitLogout = async () => {
  return await api
    .post(GQL_URL, {
      json: {
        query: `mutation { logout }`,
      },
    })
    .json();
};
