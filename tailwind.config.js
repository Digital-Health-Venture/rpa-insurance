/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        avenir: ['Avenir', 'sans-serif'],
        prompt: ['Prompt', 'sans-serif'],
      },
      boxShadow: {
        s: '0px 1px 9px 0px rgba(108, 108, 108, 0.25)',
      },
      colors: {
        gray: {
          100: '#BFBFBF',
          200: '#929292',
          300: '#545454',
        },
        blue: {
          100: '#4BAEC5',
        },
        red: {
          100: '#EC3737',
        },
        teal: {
          50: '#E0F8EE',
          100: '#55C1BB',
          200: '#038986',
        },
      },
    },
  },
  plugins: [],
}
