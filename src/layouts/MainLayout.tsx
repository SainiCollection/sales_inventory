import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../components/Header';

const MainLayout: React.FC = () => (
  <Box display="flex" >
    <Box component="main" sx={{ flexGrow: 1, width:"100%" }}>
      <Header />
      <Outlet />
    </Box>
  </Box>
);

export default MainLayout;
