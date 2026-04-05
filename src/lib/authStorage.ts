const TOKEN_KEY = 'access_token';

const isClient = typeof window !== 'undefined';

export const authStorage = {
  getToken: () => (isClient ? sessionStorage.getItem(TOKEN_KEY) : null),
  setToken: (token: string) =>
    isClient && sessionStorage.setItem(TOKEN_KEY, token),
  removeToken: () => isClient && sessionStorage.removeItem(TOKEN_KEY),
  isAuthenticated: () =>
    isClient ? !!sessionStorage.getItem(TOKEN_KEY) : false,
};
