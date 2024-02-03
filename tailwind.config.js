module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        custom: ["League Gothic", "sans-serif"],
      },
      animation: {
        "translate-y": "translate-y 1s ease-in-out infinite",
      },
      colors: {
        "purple-standard": "#22223B",
        "purple-dark": "#4A4E69",
        "teal-standard": "#226d8a",
        "gray-standard": "#1F2833",
        "theme-dark-blue": "#05060a",
        "theme-cyan": "#16cff7",
        "theme-teal-light": "#14b0d5",
        "theme-teal-dark": "#224f5c",
        "theme-blue": "#0a6ab4",
        "theme-orange": "#cd8951",
        "theme-grey": "#c8d8d7",
        "theme-dark-purple": "#1A202C",
        "purple-6": "#753188",

        "primary-white": "#fff",
        "primary-1": "#590D22",
        "primary-2": "#800F2F",
        "primary-3": "#FF758F",
        "primary-4": "#FFCCD5",
        "primary-5": "#FFF0F3",
      },
      padding: {
        54: "260px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
