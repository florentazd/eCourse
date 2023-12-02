/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      "2xl": { max: "1536px" },
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      xs: { max: "400px" },
      "2xs": { max: "350px" },
    },
    extend: {
      colors: {
        main: "#AF2655",
        dark: "#191919",
      },

      fontFamily: {
        circular: ["circular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
