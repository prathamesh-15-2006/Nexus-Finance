import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const themes = {
  blue: '#3b82f6',
  green: '#10b981',
  orange: '#f97316',
  red: '#ef4444',
  teal: '#14b8a6',
  pink: '#ec4899',
};

export type ThemeColor = keyof typeof themes;

interface ThemeStore {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themeColor: 'blue',
      setThemeColor: (color) => set({ themeColor: color }),
    }),
    {
      name: 'crm-theme-storage',
    }
  )
);
