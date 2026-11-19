/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pulso: {
          bg: '#EEF0FA',
          navy: '#1B2A4A',
          purple: '#785EDF',
          cyanStart: '#7FD8E6',
          cyanEnd: '#84C5F0',
          pinkBg: '#FDF2F8',
          pinkAccent: '#EC4899',
          pinkDark: '#BE185D',
          card: '#FFFFFF',
          muted: '#64748B',
          border: '#E2E8F0',
          success: '#10B981',
          warning: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.015em',
        tight: '-0.01em',
        normal: '0em',
        wide: '0.02em',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '28px',
      },
      boxShadow: {
        'pulso': '0 8px 24px rgba(27, 42, 74, 0.06)',
        'pulso-lg': '0 12px 32px rgba(27, 42, 74, 0.10)',
        'pulso-btn': '0 6px 18px rgba(127, 216, 230, 0.35)',
        'pulso-purple': '0 6px 18px rgba(120, 94, 223, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
