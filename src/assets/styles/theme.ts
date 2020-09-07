import { breakpoints, Breakpoint, InBreakpoint } from './breakpoints';

const colors = {
  primary: '#366091',
  secondary: '#4682b4',
  background: '#151f22',
  white: '#bdc7da',
  red: '#ff355e',
  gray: '#646464',
  black: '#213147',
  green: '#4d8c57',
  brown: '#654321',
  backdrop: 'rgba(21, 31, 34, 0.8)',
};

const shadows = {
  low: '0px 2px 8px -2px rgba(0, 0, 0, 0.16)',
  high: '0px 6px 24px -6px rgba(0, 0, 0, 0.24)',
};

export interface Theme {
  fontBase: string;
  colors: Partial<typeof colors>;
  shadows: Partial<typeof shadows>;
  breakpoints: typeof breakpoints;
  breakpoint(name: Exclude<Breakpoint, 'xs'>): string;
  getValueInBp: <
    T extends string | number | undefined,
    P extends Breakpoint = Breakpoint
  >(
    value: InBreakpoint<T, P>,
    breakpoint: P | P[]
  ) => T | undefined;
}

export const defaultTheme: Theme = {
  fontBase: 'Baloo Tamma',
  colors,
  shadows,
  breakpoints,
  breakpoint(name) {
    return `@media screen and (min-width: ${this.breakpoints[name]})`;
  },
  getValueInBp(value, bp) {
    if (typeof value === 'object') {
      if (Array.isArray(bp)) {
        const result = bp.reduce<typeof value[keyof typeof value] | undefined>(
          (prev, name) => prev || value[name],
          undefined
        );
        return result;
      }
      return value[bp];
    }
    return value;
  },
};

interface NewTheme extends Pick<Theme, 'colors' | 'shadows'> {
  breakpoints: Partial<typeof breakpoints>;
}

export function overrideDefaultTheme(newTheme: NewTheme): Theme {
  return {
    ...defaultTheme,
    colors: { ...defaultTheme.colors, ...newTheme.colors },
    shadows: { ...defaultTheme.shadows, ...newTheme.shadows },
    breakpoints: { ...defaultTheme.breakpoints, ...newTheme.breakpoints },
  };
}
