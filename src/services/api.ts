// services/api.ts
import ky, { HTTPError } from 'ky';
import { authStorage } from '#/lib/authStorage';
import { GQL_URL } from '#/lib/constants';

export const api = ky.create({
  credentials: 'include',
  retry: {
    limit: 1,
    statusCodes: [401],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = authStorage.getToken();
        if (!token) return;
        request.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
    beforeRetry: [
      async ({ request, error }) => {
        if (error instanceof HTTPError && error.response.status === 401) {
          const response = await ky
            .post(GQL_URL, {
              credentials: 'include',
              json: { query: 'mutation { refreshToken { accessToken } }' },
              retry: 0,
            })
            .json<{ data: { refreshToken: { accessToken: string } } }>();

          const newToken = response.data.refreshToken.accessToken;
          authStorage.setToken(newToken);
          request.headers.set('Authorization', `Bearer ${newToken}`);
        }
      },
    ],
  },
});
