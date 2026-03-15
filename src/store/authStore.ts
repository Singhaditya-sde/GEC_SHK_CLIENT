import { create } from "zustand";
import api from "@/services/api";

export interface User {
  id: number;
  email: string;
  role: 'ADMIN' | 'FACULTY' | 'STUDENT';
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isCheckingAuth: boolean
  login: (user: User) => void
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  login: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  checkAuth: async () => {
    try {
      const res = await api.get("/api/auth/me")

      const user = res.data.data

      set({
        user: {
          id: user.userId,
          email: user.email,
          role: user.role
        },
        isAuthenticated: true,
        isCheckingAuth: false,
      })
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false
      })
    }
  }
}))