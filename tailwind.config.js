// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this covers your file types
  ],
  theme: {
    extend: {},
  },
  // plugins: [],
  plugins: [require("@tailwindcss/typography")],
};
