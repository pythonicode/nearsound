module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#BB86FC',
          '50': '#FFFFFF',
          '100': '#FEFDFF',
          '200': '#EDE0FE',
          '300': '#DDC2FD',
          '400': '#CCA4FD',
          '500': '#BB86FC',
          '600': '#9C4FFB',
          '700': '#7D19F9',
          '800': '#6205D4',
          '900': '#49049E'
        },
        'dark': {
          DEFAULT: '#121212',
          '50': '#474747',
          '100': '#424242',
          '200': '#2E2E2E',
          '300': '#222222',
          '400': '#1F1F1F',
          '500': '#121212',
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
