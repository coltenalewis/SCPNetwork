import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cafe: {
          cream: '#f6f0e6',
          paper: '#fffbf5',
          ink: '#24201a',
          charcoal: '#1b1a17',
          gold: '#ad8c52',
          muted: '#746a59'
        }
      },
      boxShadow: {
        soft: '0 8px 30px rgba(38, 30, 17, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
