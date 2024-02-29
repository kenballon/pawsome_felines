export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}' ],
  theme: {
    extend: {
      colors: {
        primary: '#f08080',
        secondary: '#ffdab9',
        primaryDark: '#b64848',
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
      textShadow: {
        default: 'rgba(0, 0, 0, 0.2) 0px 20px 30px;',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

