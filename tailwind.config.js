/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aicte: {
          blue: '#0b3b60',
          dark: '#08253d',
          gold: '#f59e0b',
          saffron: '#ea580c',
          light: '#f0f7fc',
          accent: '#0284c7'
        }
      }
    },
  },
  plugins: [],
}
