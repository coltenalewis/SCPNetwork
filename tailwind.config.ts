import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface:  { DEFAULT: '#0f0d0a', raised: '#1a1714', card: '#1e1b16' },
        ink:      { DEFAULT: '#e8e0d4', soft: '#bfb5a4', mute: '#6b6259' },
        accent:   { DEFAULT: '#c9a96e', hover: '#dfc08a', dim: '#8a7444' },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft:   '0 2px 12px rgba(0, 0, 0, 0.25)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.40)',
      },
    },
  },
  plugins: [],
};

export default config;
