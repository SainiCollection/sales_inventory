import React, { createContext, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import themeConfig from './index';

type ColorMode = { toggleColorMode: () => void };
export const ColorModeContext = createContext<ColorMode>({ toggleColorMode: () => {} });

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // static theme for now (dark mode toggle can be added later)
  const colorMode = useMemo(() => ({ toggleColorMode: () => {} }), []);
  const theme = themeConfig;
  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProvider;
