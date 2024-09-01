/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        menu: "0px 0px 60px 10px hsla(0, 0%, 0%, 0.05)",
      },
      animation: {
        cmdk: "5s infinite bounce ease-in-out",
        slide: "intro .3s ease-in-out forwards",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translate(-50%, 0px)" },
          "50%": { transform: "translate(-50%, -12px)" },
        },
        intro: {
          "0%": {
            transform: "translateY(10px)",
            opacity: 0,
            filter: "blur(5px)",
          },
          "95%": { transform: "translateY(-1px)", opacity: 1 },
          "100%": { transform: "translateY(0)", opacity: 1, filter: "blur(0)" },
        },
      },
    },
  },
  plugins: [],
};
