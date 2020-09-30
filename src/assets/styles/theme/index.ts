import { CSSObject } from 'styled-components';
import { breakpoints, Breakpoint } from './breakpoints';

const colors = {
  blue0: '#366091',
  blue1: '#4478b5',
  blue2: '#3f6188',
  blue3: '#2b5f9c',
  blue4: '#2b4d74',
  cyan0: '#4aabc5',
  cyan1: '#7dc3d5',
  cyan2: '#56a4b9',
  cyan3: '#3bb4d4',
  cyan4: '#358da4',
  white0: '#DAECF2',
  white1: '#DFEEF3',
  white2: '#E4F1F5',
  black0: '#151f22',
  black1: '#363f41',
  black2: '#5a6163',
  red0: '#ff355e',
  gray0: '#646464',
  green0: '#4d8c57',
  brown0: '#654321',
};

const shadows = {
  low: '0px 2px 8px -2px rgba(0, 0, 0, 0.16)',
  high: '0px 6px 24px -6px rgba(0, 0, 0, 0.24)',
};

const zIndex = {
  mobileStepper: 1000,
  speedDial: 1050,
  appBar: 1100,
  backdrop: 1150,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subitile1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline';

type TypographyVariantConfig = Required<{ [K in TypographyVariant]: CSSObject }>;

const typographyVariantConfig: TypographyVariantConfig = {
  h1: {
    fontSize: '6rem',
    fontWeight: 'normal',
    lineHeight: 1.167,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontWeight: 'normal',
    fontSize: '3.75rem',
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontWeight: 'normal',
    fontSize: '3rem',
    lineHeight: 1.167,
    letterSpacing: '0em',
  },
  h4: {
    fontWeight: 'normal',
    fontSize: '2.125rem',
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontWeight: 'normal',
    fontSize: '1.5rem',
    lineHeight: 1.334,
    letterSpacing: '0em',
  },
  h6: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
  },
  subitile1: {
    fontWeight: 'normal',
    fontSize: '1rem',
    lineHeight: 1.75,
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
  },
  body1: {
    fontWeight: 'normal',
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontWeight: 'normal',
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },
  button: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
  },
  caption: {
    fontWeight: 'normal',
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontWeight: 'normal',
    fontSize: '0.75rem',
    lineHeight: 2.66,
    letterSpacing: '0.08333em',
  },
};

export interface Theme {
  fontBase: string;
  colors: typeof colors;
  shadows: typeof shadows;
  breakpoints: typeof breakpoints;
  typography: TypographyVariantConfig;
  zIndex: typeof zIndex;
  breakpoint(name: Exclude<Breakpoint, 'xs'>): string;
}

export const defaultTheme: Theme = {
  fontBase: 'Baloo Tamma',
  colors,
  shadows,
  breakpoints,
  typography: typographyVariantConfig,
  zIndex,
  breakpoint(name) {
    return `@media screen and (min-width: ${this.breakpoints[name]})`;
  },
};

interface NewTheme {
  colors?: Partial<typeof colors>;
  shadows?: Partial<typeof shadows>;
  breakpoints?: Partial<typeof breakpoints>;
  typography?: Partial<TypographyVariantConfig>;
  zIndex?: Partial<typeof zIndex>;
}

export function overrideDefaultTheme(newTheme: NewTheme): Theme {
  const { typography: tDefault } = defaultTheme;
  const { typography = {} } = newTheme;
  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    body1,
    body2,
    subitile1,
    subtitle2,
    button,
    caption,
    overline,
  } = typography;

  return {
    ...defaultTheme,
    colors: { ...defaultTheme.colors, ...newTheme.colors },
    shadows: { ...defaultTheme.shadows, ...newTheme.shadows },
    breakpoints: { ...defaultTheme.breakpoints, ...newTheme.breakpoints },
    zIndex: { ...defaultTheme.zIndex, ...newTheme.zIndex },
    typography: {
      h1: { ...tDefault.h1, ...h1 },
      h2: { ...tDefault.h2, ...h2 },
      h3: { ...tDefault.h3, ...h3 },
      h4: { ...tDefault.h4, ...h4 },
      h5: { ...tDefault.h5, ...h5 },
      h6: { ...tDefault.h6, ...h6 },
      subitile1: { ...tDefault.subitile1, ...subitile1 },
      subtitle2: { ...tDefault.subtitle2, ...subtitle2 },
      body1: { ...tDefault.body1, ...body1 },
      body2: { ...tDefault.body2, ...body2 },
      button: { ...tDefault.button, ...button },
      caption: { ...tDefault.caption, ...caption },
      overline: { ...tDefault.overline, ...overline },
    },
  };
}
