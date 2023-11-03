const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(rgb(247, 243, 200), rgb(250, 247, 232), rgb(255,255,255))',
        'gradient-radial-dark': 'radial-gradient(rgb(0, 0, 0), rgb(0,0,0), rgb(0,0,0))'
      },
      colors: {
        brand_one: {
          50: '#EAD9CD',
          100: '#E3CDBC',
          200: '#DCC0AC',
          300: '#D5B39B',
          400: '#CEA78B',
          500: '#C89B7B',
          600: '#BB855E',
          700: '#AA7047',
          800: '#8E5E3B',
          900: '#714B2F'
        }
      },
      fontFamily: {
        recursive: ['Recursive', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
