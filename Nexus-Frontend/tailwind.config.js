/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',  // good for Full HD / 2K
        '4xl': '2560px',  // good for 2.5K screens
        '5xl': '3840px',  // for 4K UHD screens
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'fade-in-right': 'fade-in-right 0.8s ease-out 0.2s both',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite 2s',
        'float-slow': 'float-slow 10s ease-in-out infinite 4s',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'pulse-delayed': 'pulse-delayed 6s ease-in-out infinite 2s',
        'gradient': 'gradient 3s ease infinite',
        'shimmer': 'shimmer 2s infinite',
        'bounce-in': 'bounce-in 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.8s ease-out',
        'slide-in-right': 'slide-in-right 0.8s ease-out',
        'glow': 'glow 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'scale-pulse': 'scale-pulse 2s ease-in-out infinite',
        'money-float': 'money-float 4s ease-in-out infinite',
        'chart-grow': 'chart-grow 1s ease-out',
        'coin-spin': 'coin-spin 2s linear infinite',
        'dollar-bounce': 'dollar-bounce 2s infinite',
        'fade-in': 'fadeIn 1s ease-out',
        'slide-up': 'slideUp 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // If you have other keyframes like glow, fade-in-up, etc., you can add them here
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'finance': '0 10px 40px rgba(59, 130, 246, 0.2)',
        'finance-lg': '0 20px 60px rgba(59, 130, 246, 0.3)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'finance-gradient': 'linear-gradient(135deg, #3B82F6, #10B981)',
        'finance-gradient-reverse': 'linear-gradient(135deg, #10B981, #3B82F6)',
        'nexus-gradient': 'linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)',
      },
    },
  },
  plugins: [],
};
