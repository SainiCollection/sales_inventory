import React from 'react';
import { Container, Card, CardContent, Typography, Box } from '@mui/material';

const MiniChart = ({ color = 'primary', value = 0 }) => (
  <Box sx={{ width: '100%', height: 80, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="caption">Chart ({value})</Typography>
  </Box>
);

const DashboardPage = () => {
  const inventory = 1248;
  const sales = 2450;
  const borrow = 32;

  return (
    <Box display="flex">
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth={'lg' as unknown as any}>
          <Typography variant="h5" gutterBottom>Dashboard</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="subtitle2">Inventory</Typography>
                <Typography variant="h6">{inventory}</Typography>
                <MiniChart value={inventory} />
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="subtitle2">Sales</Typography>
                <Typography variant="h6">${sales}</Typography>
                <MiniChart value={sales} />
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="subtitle2">Borrow</Typography>
                <Typography variant="h6">{borrow}</Typography>
                <MiniChart value={borrow} />
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
