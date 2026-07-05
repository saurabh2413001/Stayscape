/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1F2A44',
          50: '#EEF1F6',
          100: '#D6DCE9',
          200: '#AEB9D2',
          300: '#8695BB',
          400: '#5E72A4',
          500: '#3D4E82',
          600: '#2C3B66',
          700: '#1F2A44', // primary
          800: '#161E31',
          900: '#0D131E',
        },
        marigold: {
          DEFAULT: '#F5A623',
          50: '#FFF8EC',
          100: '#FEEDCB',
          200: '#FCDA97',
          300: '#FAC663',
          400: '#F8B543',
          500: '#F5A623', // accent
          600: '#D68A0F',
          700: '#A9690C',
          800: '#7C4C09',
          900: '#4F3005',
        },
        teal: {
          DEFAULT: '#0F6B63',
          50: '#E7F4F2',
          100: '#C4E5E0',
          200: '#8FCCC3',
          300: '#5AB3A6',
          400: '#2E948A',
          500: '#0F6B63', // secondary accent
          600: '#0C554F',
          700: '#093F3B',
          800: '#062A27',
          900: '#031513',
        },
        sand: '#FBF7F0',
        charcoal: '#2B2B2B',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px rgba(31, 42, 68, 0.08)',
        'card-hover': '0 12px 28px rgba(31, 42, 68, 0.16)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out both',
        shimmer: 'shimmer 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
