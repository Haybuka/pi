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
          100: '#4B4B4B',
          200: '#EF5623',
          300: '#F5F5F5',
          400: '#1473E6',
          500: '#6E6E6E',
          600: '#2C2C2C',
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