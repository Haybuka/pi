/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        pi: {
          100: '#002D62',
          200: '#31AFD4',
          300: '#BCE4F1',
          400: '#DEF1F7'
        },
        piboard: {
          100: '#FFCE00',
          200: '#FC592D',
          300: '#00AAFF',
          400: '#E59F71',
          500: '#7BE0AA',
          600: '#ECA400',
          700: "#7AC74F"
        }
      }
    }
  },
  plugins: [require('flowbite/plugin')],
}