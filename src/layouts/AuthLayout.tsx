import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';

const AuthLayout: React.FC = () => (
  <Container maxWidth="xs">
    <Box mt={8}>
      <Outlet />
    </Box>
  </Container>
);

export default AuthLayout;
