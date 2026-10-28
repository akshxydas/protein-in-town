/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0C0D0E',
          DEFAULT: '#111315',
          800: '#181A1D',
          700: '#212529',
          600: '#2E3338',
        },
        graphite: {
          DEFAULT: '#1B1E21',
          light: '#24282D',
          border: '#2E3339',
        },
        lime: {
          DEFAULT: '#FF2A3A',
          hover: '#E01E2E',
          light: '#FF5C6A',
          dim: '#C41826',
          dark: '#4A0D12',
        },
        brandRed: {
          DEFAULT: '#FF2A3A',
          hover: '#E01E2E',
          light: '#FF5C6A',
          dim: '#C41826',
          dark: '#4A0D12',
        },
        offwhite: '#F6F7F3',
        coolgray: {
          100: '#F1F3F5',
          200: '#E4E7EA',
          300: '#CED4DA',
          400: '#A6ABB0',
          500: '#6C757D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'lime-glow': '0 0 25px -5px rgba(255, 42, 58, 0.45)',
        'lime-glow-sm': '0 0 12px -2px rgba(255, 42, 58, 0.35)',
        'red-glow': '0 0 25px -5px rgba(255, 42, 58, 0.45)',
        'red-glow-sm': '0 0 12px -2px rgba(255, 42, 58, 0.35)',
        'dark-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
