const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#eaf3ed',
      100: '#d6e7db',
      200: '#c1dcc8',
      300: '#add0b6',
      400: '#98c4a4',
      500: '#83b892',
      600: '#6fac80',
      700: '#5aa16d',
      800: '#46955b',
      900: '#318949',
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
    yellow: {
      400: '#e8c239',
    },
    brown: {
      400: '#9a5639',
    },
    gray: {
      400: '#adabac',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});

export {theme};
