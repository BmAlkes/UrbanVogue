/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "urban-blue": "#11407f",
        "urban-ocean":"#06Bee1"
      },
    },
  },
  plugins: [],
}

