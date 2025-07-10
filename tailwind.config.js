/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        piPurple: '#5F259F',
        piGold: '#FDBD27',
        piLavender: '#EEE7F6',
        piGray: '#F4F2F8',
      },
    },
  },
  plugins: [],
}
