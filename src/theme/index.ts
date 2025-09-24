import { createTheme } from '@mui/material/styles';
import components from './components';
import typography from './typography';

const themeConfig = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563eb', contrastText: '#ffffff' },
    secondary: { main: '#0f1724', contrastText: '#e6eef9' },
    background: { default: '#f3f4f6', paper: '#ffffff' },
  text: { primary: '#0f1724', secondary: '#6b7280' },
    success: { main: '#22c55e' },
    warning: { main: '#facc15' },
    error: { main: '#ef4444' },
    info: { main: '#3b82f6' },
  },
  typography: typography as any,
  components: components as any,
});

export default themeConfig;
