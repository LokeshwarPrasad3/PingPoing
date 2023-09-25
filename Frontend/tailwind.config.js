module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*",
  ],
  theme: {
    extend: {
      fontFamily: {
        'signika': ['signika negative', 'sans-serif'],
        'bree': ['bree serif', 'sans-serif'],
        'overpass': ['overpass', 'sans-serif']
      },
    },
  },
  plugins: [],
}