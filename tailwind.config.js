module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          DEFAULT: '#1A1A1A',
          '50': '#474747',
          '100': '#424242',
          '200': '#383838',
          '300': '#2E2E2E',
          '400': '#242424',
          '500': '#1A1A1A',
          '600': '#0F0F0F',
          '700': '#050505',
          '800': '#000000',
          '900': '#000000'
        },
      }
    },
  },
  plugins: [],
}
