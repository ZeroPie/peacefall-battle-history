import { globalCss } from '../stitches.config';

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    fontWeight: '$light',
    fontSize: '$16',
    color: '$secondary',
  },
  h1: {
    fontWeight: '$bold',
    fontSize: '$24',
    margin: 0,
  },
  h2: {
    fontWeight: '$bold',
    fontSize: '$20',
    margin: 0,
  },
  body: {
    margin: 0,
    padding: 0,
    minHeight: '100%',
    background: '$background',
  },
  'html, #__next': { height: 'inherit', width: '100vw' },
  a: { all: 'unset' },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
});

globalStyles();
