/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{html,js,jsx}",
    "./src/templates/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        pursuit: {
          green: "#32BC89",
          "green-dark": "#2EAD76",
          "green-light": "#E1F1DC",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
