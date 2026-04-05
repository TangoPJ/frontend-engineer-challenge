import { createContext, useContext, useState, useEffect } from 'react';
import { authStorage } from './authStorage';
import { router } from '#/router';
import ky from 'ky';
import { GQL_URL } from './constants';
import { submitLogout } from '#/services';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = authStorage.getToken();

      if (token) {
        setToken(token);
        setIsLoading(false);
        return;
      }

      try {
        const response = await ky
          .post(GQL_URL, {
            credentials: 'include',
            json: { query: 'mutation { refreshToken { accessToken } }' },
          })
          .json<{ data: { refreshToken: { accessToken: string } } }>();

        const newToken = response.data.refreshToken.accessToken;
        authStorage.setToken(newToken);
        setToken(newToken);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (newToken: string) => {
    authStorage.setToken(newToken);
    setToken(newToken);
    router.navigate({ to: '/' });
  };

  const logout = async () => {
    try {
      await submitLogout();
    } catch {
      //
    } finally {
      authStorage.removeToken();
      setToken(null);
      router.navigate({ to: '/login' });
    }
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
