export default {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#f08080',
        secondary: '#ffdab9',
      },
      fontFamily: {
        'primary': ['Switzer', 'sans-serif'],
        'secondary': ['Boska'],
      },
      container:{
        center: true,
        padding: '2rem',
      }
    },
  },
  plugins: [],
}

