/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#4F46E5', 50: '#EEF0FD', 100: '#DCE0FB', 500: '#4F46E5', 600: '#4338CA', 700: '#372FA6' },
        secondary: { DEFAULT: '#7C3AED', 500: '#7C3AED', 600: '#6D28D9' },
        accent: { DEFAULT: '#06B6D4', 500: '#06B6D4' },
        success: { DEFAULT: '#10B981' },
        warning: { DEFAULT: '#F59E0B' },
        danger: { DEFAULT: '#EF4444' },
        dark: { DEFAULT: '#0F172A', 800: '#141b2e', 900: '#0b1120' },
        light: { DEFAULT: '#F8FAFC' },
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        alt: ['"Montserrat"', 'sans-serif'],
      },
      backgroundImage: {
        'aurora': 'radial-gradient(at 20% 20%, rgba(124,58,237,0.35) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(79,70,229,0.35) 0px, transparent 50%), radial-gradient(at 0% 80%, rgba(6,182,212,0.3) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(16,185,129,0.2) 0px, transparent 50%)',
        'grad-primary': 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
        'grad-accent': 'linear-gradient(135deg, #06B6D4 0%, #4F46E5 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(79,70,229,0.35)',
        'glow-accent': '0 0 40px rgba(6,182,212,0.35)',
        glass: '0 8px 32px rgba(15,23,42,0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
