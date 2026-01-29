import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        slateCore: {
          950: '#0b0f14',
          900: '#0f141b',
          800: '#141b24',
          700: '#1e2835',
          600: '#2b3a4f'
        },
        accent: {
          400: '#7dd3fc',
          500: '#38bdf8',
          600: '#0ea5e9'
        },
        danger: {
          500: '#ef4444'
        }
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      boxShadow: {
        panel: '0 0 0 1px rgba(148,163,184,0.08), 0 20px 40px rgba(15,23,42,0.45)'
      }
    }
  },
  plugins: []
};

export default config;
