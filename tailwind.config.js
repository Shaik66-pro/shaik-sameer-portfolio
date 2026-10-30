/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#070709',
          900: '#0A0A0C',
          800: '#121217',
          700: '#1A1A22',
          600: '#252530',
          border: '#282834',
        },
        cyber: {
          yellow: '#E4FF1A',
          yellowBright: '#F3FF2E',
          yellowMuted: '#CBE510',
          gold: '#FACC15',
        },
        coral: {
          500: '#FF4D30',
          600: '#E03C20',
        },
        ivory: {
          50: '#FCFBF8',
          100: '#F7F6F2',
          200: '#EFECE4',
          300: '#DDD8CB',
          800: '#292823',
          900: '#171613',
        }
      },
      fontFamily: {
        display: ['Syne', 'Impact', 'sans-serif'],
        serifDisplay: ['"Instrument Serif"', '"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-yellow': '0 0 35px -5px rgba(228, 255, 26, 0.45)',
        'glow-coral': '0 0 30px -5px rgba(255, 77, 48, 0.45)',
        'glow-white': '0 0 40px -10px rgba(255, 255, 255, 0.25)',
        'bevel-dark': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 10px 25px -5px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
