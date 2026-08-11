import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Graphite + Copper design system — CSS-variable backed */
        background: 'var(--background)',
        section: 'var(--section-bg)',
        card: 'var(--card)',
        'card-elevated': 'var(--card-elevated)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--text-primary)',
        muted: 'var(--text-secondary)',
        copper: {
          DEFAULT: 'var(--copper)',
          hover: 'var(--copper-hover)',
        },
        accent: 'var(--copper)',
        'accent-hover': 'var(--copper-hover)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Satoshi', 'sans-serif'],
        sans: ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-mono)', 'Fira Code', 'Cascadia Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        code: ['var(--font-mono)', 'Fira Code', 'Cascadia Code', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        drift: 'drift 20s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        grain: 'grain 8s steps(10) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.35' },
        },
        drift: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(-4%, 2%)' },
          '30%': { transform: 'translate(2%, -4%)' },
          '40%': { transform: 'translate(-2%, 5%)' },
          '50%': { transform: 'translate(-4%, 2%)' },
          '60%': { transform: 'translate(3%, 0)' },
          '70%': { transform: 'translate(0, 3%)' },
          '80%': { transform: 'translate(-3%, 0)' },
          '90%': { transform: 'translate(2%, 2%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        glow: '0 0 40px rgba(255,255,255,0.04)',
        'glow-copper': '0 0 40px var(--copper-glow)',
        card: '0 8px 32px var(--shadow)',
        'card-hover': '0 20px 56px var(--shadow)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
