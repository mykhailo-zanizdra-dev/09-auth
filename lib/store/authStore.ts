import { create } from 'zustand';
import { User } from '@/types/user';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

const useAuthStore = create<AuthStore>()(set => ({
  isAuthenticated: false,
  user: null,
  setUser: user => set(() => ({ user, isAuthenticated: !!user })),
  clearIsAuthenticated: () =>
    set(() => ({ user: null, isAuthenticated: false })),
}));

export default useAuthStore;
