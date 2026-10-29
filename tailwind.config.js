/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EBDDC9',
          400: '#DFCAA9',
        },
        champagne: {
          50: '#FBF9F5',
          100: '#F5EFE4',
          200: '#ECE1CD',
          300: '#DECBAE',
          500: '#B89765',
          600: '#9C7A4A',
          700: '#7E6036',
        },
        gold: {
          100: '#FEF9E7',
          200: '#FCF1C5',
          300: '#F7DF87',
          400: '#ECC448',
          500: '#D4A322',
          600: '#AA7B12',
          700: '#81590A',
        },
        rose: {
          gold: '#C97A7E',
          soft: '#F6E5E5',
          deep: '#8A2D3A',
        },
        obsidian: {
          DEFAULT: '#1E1D24',
          light: '#2E2B35',
          muted: '#5A5666',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(184, 151, 101, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'luxury-lg': '0 20px 45px -10px rgba(184, 151, 101, 0.2), 0 8px 20px -4px rgba(0, 0, 0, 0.06)',
        'gold-glow': '0 0 25px rgba(212, 163, 34, 0.35)',
        'candle-glow': '0 0 35px rgba(255, 179, 71, 0.55)',
      }
    },
  },
  plugins: [],
}

