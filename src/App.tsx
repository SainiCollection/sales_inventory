import React from 'react';
import AppRouter from './routes/AppRouter';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from './modules/auth/authSlice';
import { Link as RouterLink } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Inventory Management
          </Typography>
          <Button color="inherit" component={RouterLink} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/inventory">
            Inventory
          </Button>
          <Button color="inherit" component={RouterLink} to="/sales">
            Sales
          </Button>
          <Button color="inherit" component={RouterLink} to="/accounts">
            Accounts
          </Button>
          <Button color="inherit" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <AppRouter />
    </Box>
  );
}

export default App;
