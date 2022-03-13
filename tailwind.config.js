module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: "#6B717E",
      "space-cadet": "#1C1F33",
      alabaster: "#F4F3EE",
      black: "#000000",
      white: "#fff",
      "gloosy-grape": "#AF90A9",
      feldgrau: "#4E6151",
      carmine: "#96031A",
      "russian-green": "#russian-green",
    },
    fontFamily: {
      sans: ["Futura", "sans-serif"],
      serif: ["Memphis", "serif"],
      basier: ["Basier Square", "sans-serif"],
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      4: "4px",
      6: "6px",
    },
  },
  variants: {},
  plugins: [],
};
