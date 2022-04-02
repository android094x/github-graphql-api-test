module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        'screen-16': 'calc(100vh - 64px)',
      },
      minHeight: {
        'screen-16': 'calc(100vh - 64px)',
      },
    },
  },
  plugins: [],
}
