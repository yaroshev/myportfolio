/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Enhanced color palette with more sophisticated gradients
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out forwards',
        float: 'float 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float1: 'float1 8s ease-in-out infinite',
        float2: 'float2 12s ease-in-out infinite',
        float3: 'float3 10s ease-in-out infinite',
        pulse: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
        slideUp: 'slideUp 0.8s ease-out forwards',
        slideDown: 'slideDown 0.8s ease-out forwards',
        slideLeft: 'slideLeft 0.8s ease-out forwards',
        slideRight: 'slideRight 0.8s ease-out forwards',
        spin: 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateZ(0)' },
          '100%': { opacity: 1, transform: 'translateZ(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateZ(0)' },
          '50%': { transform: 'translateY(-20px) translateZ(0)' },
        },
        float1: {
          '0%': { transform: 'translate(0, 0) translateZ(0)' },
          '33%': { transform: 'translate(10px, -15px) translateZ(0)' },
          '66%': { transform: 'translate(-10px, 10px) translateZ(0)' },
          '100%': { transform: 'translate(0, 0) translateZ(0)' },
        },
        float2: {
          '0%': { transform: 'translate(0, 0) translateZ(0)' },
          '25%': { transform: 'translate(-12px, 15px) translateZ(0)' },
          '50%': { transform: 'translate(10px, 5px) translateZ(0)' },
          '75%': { transform: 'translate(15px, -10px) translateZ(0)' },
          '100%': { transform: 'translate(0, 0) translateZ(0)' },
        },
        float3: {
          '0%': { transform: 'translate(0, 0) translateZ(0)' },
          '40%': { transform: 'translate(10px, 10px) translateZ(0)' },
          '60%': { transform: 'translate(-15px, -7px) translateZ(0)' },
          '100%': { transform: 'translate(0, 0) translateZ(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0', transform: 'translateZ(0)' },
          '100%': { backgroundPosition: '200% 0', transform: 'translateZ(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px) translateZ(0)', opacity: 0 },
          '100%': { transform: 'translateY(0) translateZ(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px) translateZ(0)', opacity: 0 },
          '100%': { transform: 'translateY(0) translateZ(0)', opacity: 1 },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px) translateZ(0)', opacity: 0 },
          '100%': { transform: 'translateX(0) translateZ(0)', opacity: 1 },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px) translateZ(0)', opacity: 0 },
          '100%': { transform: 'translateX(0) translateZ(0)', opacity: 1 },
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(14, 165, 233, 0.5)',
        'glow-accent': '0 0 15px rgba(217, 70, 239, 0.5)',
        'glow-sm': '0 0 8px rgba(14, 165, 233, 0.3)',
      },
      height: {
        'safe-bottom': 'env(safe-area-inset-bottom, 12px)',
      },
      padding: {
        'safe-bottom': 'env(safe-area-inset-bottom, 12px)',
      },
    },
  },
  plugins: [],
};