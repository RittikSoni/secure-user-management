// src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
    user: null | { id: string, token: string };
    setUser: (user: { id: string, token: string }) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null })
}));
