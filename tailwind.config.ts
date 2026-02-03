import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f7f1ea',
        espresso: '#2c1f1a',
        charcoal: '#18120f',
        mocha: '#6b4b3a',
        latte: '#d8c6b6'
      },
      boxShadow: {
        soft: '0 24px 60px rgba(44,31,26,0.12)',
        glow: '0 0 24px rgba(216,198,182,0.35)'
      },
      keyframes: {
        steam: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '20%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-40px) scale(1.2)', opacity: '0' }
        },
        cupFill: {
          '0%': { transform: 'translateY(20%)' },
          '100%': { transform: 'translateY(0%)' }
        },
        pourBar: {
          '0%': { transform: 'translateX(-20%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(20%)' }
        },
        floatSlow: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0px)' }
        }
      },
      animation: {
        steam: 'steam 6s ease-in-out infinite',
        'steam-delayed': 'steam 6s ease-in-out infinite 2s',
        'cup-fill': 'cupFill 1.4s ease-out',
        'pour-bar': 'pourBar 2.5s ease-in-out infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
