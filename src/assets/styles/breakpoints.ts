export const breakpoints = {
  xs: '0px',
  sm: '320px',
  md: '480px',
  lg: '768px',
  xl: '1080px',
  xxl: '1366px',
};

export type Breakpoint = keyof typeof breakpoints;

export type InBreakpoint<CssType, P extends Breakpoint = Breakpoint> =
  | CssType
  | Partial<Pick<{ [key in Breakpoint]: CssType }, P>>;
