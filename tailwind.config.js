import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DD1C1A",
        secondary: "#FFBC42",
        raisin: "#252323", // background
        battleshipGray: "#788585",
        ashGray: "#9CAEA9",
      },
    },
  },
  plugins: [forms, typography],
};
