module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        custom: ['Patua One'],
      },
      colors: {
        covidOrange: {
          DEFAULT: '#EC7119',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
