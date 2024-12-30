/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "serif"],
      },
      backgroundImage: {
        auth: "url('./assets/bg.png')",
        services:
          "linear-gradient(90deg, #122A2C 29.47%, rgba(115, 98, 245, 0.2) 100%), url('./assets/images/services-img.png')",
      },
      colors: {
        primary: "#15707A",
      },
    },
  },
  plugins: [],
};
