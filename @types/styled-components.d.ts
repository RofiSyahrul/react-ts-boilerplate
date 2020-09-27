/* eslint-disable @typescript-eslint/no-explicit-any */
import { Theme } from '@styles/theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}

  export type StyledComponentPropsWithAs<
    C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    Props extends Record<string, any>
  > = StyledComponentProps<C, DefaultTheme, Props, never> & {
    as?: keyof JSX.IntrinsicElements;
    forwardedAs?: never;
  };
}
