import create from 'zustand';
import api from '../utils/api';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.accessToken);
    set({ token: data.accessToken });
    // You'd typically fetch the user profile here as well
  },
  register: async (email, password, firstName, lastName) => {
    await api.post('/auth/register', { email, password, firstName, lastName });
    // You could automatically log the user in after registration
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
