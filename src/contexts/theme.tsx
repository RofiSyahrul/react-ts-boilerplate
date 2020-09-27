import React from 'react';
import {
  ThemeProvider as BasicThemeProvider,
  useTheme as useBasicTheme,
  DefaultTheme,
} from 'styled-components';
import { defaultTheme, Theme } from '@styles/theme';

import { GlobalStyle } from '../assets/styles';

export function useTheme(): DefaultTheme {
  return useBasicTheme();
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
