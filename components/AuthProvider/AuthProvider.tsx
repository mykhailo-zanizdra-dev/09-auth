'use client';
import { checkSession, getMe } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';
import { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getMe();
          if (user) {
            setUser(user);
          }
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        clearIsAuthenticated();
      }
    };

    fetchSession();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
