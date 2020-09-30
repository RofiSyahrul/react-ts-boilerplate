import React from 'react';
import {
  ThemeProvider as BasicThemeProvider,
  useTheme as useBasicTheme,
  DefaultTheme,
} from 'styled-components';
import { defaultTheme, Theme } from '@styles/theme';
import { GlobalStyle } from '@styles/global-style';

export function useTheme(): DefaultTheme {
  return useBasicTheme() || defaultTheme;
}

export const ThemeProvider: React.FC<{ theme?: Theme }> = ({
  theme = defaultTheme,
  children,
}) => {
  return (
    <BasicThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </BasicThemeProvider>
  );
};
