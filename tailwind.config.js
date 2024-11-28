/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily:
    {
      comic: ["Comic Sans MS", "cursive"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
