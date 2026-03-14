import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface:  { DEFAULT: '#faf7f2', warm: '#f3ede3', card: '#fffdf9' },
        ink:      { DEFAULT: '#2c2418', soft: '#4a3f30', mute: '#8a7e6d' },
        accent:   { DEFAULT: '#9b7e4e', hover: '#7d6438', light: '#c9b48a' },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft:   '0 2px 12px rgba(42, 32, 16, 0.06)',
        medium: '0 8px 30px rgba(42, 32, 16, 0.10)',
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
