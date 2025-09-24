import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const MainLayout: React.FC = () => (
  <Box display="flex">
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Outlet />
    </Box>
  </Box>
);

export default MainLayout;
