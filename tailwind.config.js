/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        utkin: ['Comfortaa', 'cursive'],
        title: ["Saira Condensed", 'sans-serif']
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
