/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "400px",
        xs: "450px",
        "docs-lg": "950px",
      },
      width: {
        content: 1112,
        grid: 912,
        docs: 820,
        gradient: 500,
        5.5: 22,
        "7/20": "35%",
        xxs: 360,
        xs: 410,
        md: 740,
      },
      height: { hero: "75vh", 5.5: 22, gradient: 1000 },
      boxShadow: {
        sep: "0px -20px 50px 30px rgb(246 246 246)",
        cta: "0 20px 20px 0px rgb(0 0 0 / 0.075), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
        loading: "0px -20px 20px 0px rgb(255 255 255)",
        "loading-dark": "0px -20px 20px 0px rgb(3 6 22)",
        menu: "0px 0px 60px 10px hsla(0, 0%, 0%, 0.05)",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [],
};
