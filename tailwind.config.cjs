/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5faff",
          100: "#e0f0ff",
          200: "#b8dcff",
          300: "#7cbfff",
          400: "#399dff",
          500: "#007bff", // cor principal
          600: "#0063d1",
          700: "#004ea3",
          800: "#003b7a",
          900: "#002851",
        },
      },
    },
  },
  plugins: [],
};
