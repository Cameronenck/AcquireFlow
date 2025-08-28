/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#2D3748',
        },
        primary: '#3ab795',
        'primary-dark': '#2a8b71',
        secondary: '#ff6b6b',
        'secondary-dark': '#e55555',
        tertiary: '#feca57',
        'tertiary-dark': '#e9b94e',
        dark: '#2c2c2c',
        cardBg: '#F8F9FA',
        orange: {
          500: '#FF6B35',
        },
        blue: {
          600: '#2563EB',
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      borderRadius: {
        'xl': '12px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}