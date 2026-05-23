// src/store/authStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the state structure
interface AuthState {
  isLoggedIn: boolean;
  user: { name: string; email: string; avatar?: string } | null;
  login: (user: { name: string; email: string; avatar?: string }) => void;
  logout: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initialize with false (user is not logged in)
      isLoggedIn: false,
      user: null,

      // Function to set the user as logged in
      login: (user) => set({ isLoggedIn: true, user }),

      // Function to log the user out
      logout: () => {
        localStorage.removeItem('token');
        set({ isLoggedIn: false, user: null });
      },

      // Initialize auth state from localStorage
      initializeAuth: async () => {
        const token = localStorage.getItem('token');
        if (token && !get().isLoggedIn) {
          try {
            // Import fetchAdminProfile dynamically to avoid circular imports
            const { fetchAdminProfile } = await import('../services/api');
            const profile = await fetchAdminProfile();
            set({
              isLoggedIn: true,
              user: {
                name: profile.name || 'Admin User',
                email: profile.email || '',
                avatar: profile.avatar
              }
            });
          } catch (error) {
            console.warn('Failed to restore auth state:', error);
            // Clear invalid token
            localStorage.removeItem('token');
            set({ isLoggedIn: false, user: null });
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    }
  )
);
