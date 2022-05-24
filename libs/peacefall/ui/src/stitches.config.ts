import type * as Stitches from '@stitches/react';
import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  prefix: 'stitches',
  theme: {
    colors: {
      primary: '#000000',
      secondary: '#fff',
      background: '#000000',
    },
    space: {
      0: '0px',
      2: '2px',
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      24: '24px',
      32: '32px',
      40: '40px',
    },
    fontSizes: {
      13: '13px',
      14: '14px',
      16: '16px',
      20: '20px',
      24: '24px',
    },
    fonts: {
      montserrat: 'Montserrat',
    },
    fontWeights: {
      thin: 100,
      light: 300,
      regular: 400,
      bold: 700,
    },
    lineHeights: {
      14: '14px',
      16: '16px',
      20: '20px',
    },
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {
      default: '1px solid $colors$gray6',
    },
    radii: {
      4: '4px',
      6: '6px',
      8: '8px',
      50: '9999px',
    },
    shadows: {
      8: '0px 2px 8px rgba(0, 0, 0, 0.2)',
      16: '0px 2px 16px -4px rgba(0, 0, 0, 0.15)',
      20: '0px 8px 20px rgba(0, 0, 0, 0.15);',
    },
    zIndices: {
      spinner: 200,
      drawer: 100,
    },
    transitions: {
      all: 'all 0.3s ease',
    },
  },
  media: {
    bp1: '(max-width: 480px)',
    bp2: '(max-width: 640px)',
    bp3: '(max-width: 768px)',
    bp4: '(max-width: 1024px)',
    bp5: '(max-width: 1600px)',
  },
  utils: {
    marginX: (value: Stitches.ScaleValue<'space'> | 'auto') => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: Stitches.ScaleValue<'space'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value: Stitches.ScaleValue<'space'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: Stitches.ScaleValue<'space'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});

export const darkTheme = createTheme({
  colors: {
    background: '$background',
  },
});
