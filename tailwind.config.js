export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}' ],
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
      },
      aspectRatio: {},
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

