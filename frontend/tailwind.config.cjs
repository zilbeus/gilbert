/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "highlight-bg": "#241d11",
        "highlight-fg": "#af8f50",
        "result-list-bg": "#0d0d0d",
      },
    },
  },
  plugins: [],
};
