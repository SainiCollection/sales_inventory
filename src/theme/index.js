import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import components from './components';

const createAppTheme = (mode = 'light') =>
  createTheme({
    palette: { ...(palette), mode },
    typography,
    components: components({ palette: { ...(palette) } }),
  });

export default createAppTheme;
