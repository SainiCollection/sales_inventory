import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import Sidebar from '../../../components/compound/Sidebar';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DashboardCard from '../components/DashboardCard';



const DashboardPage = () => {

  return (
    <Box display="flex" sx={{width:"100%"}}>
      <Sidebar />
      <Box component="main" sx={{ p: 2, width: "87%", overflow: "hidden" }}>
        <Typography variant="h1" sx={{fontSize:"2vw", mb:2}} >Dashboard</Typography>
        <Grid sx={{display:"flex", justifyContent:"space-between"}}>
          <Grid item sx={{width:"24%"}}>
            <DashboardCard title="Total Products in Stock"
              metric="12,500"
              icon={<StorefrontIcon />}
              color="#3498db" />
          </Grid>
          <Grid item sx={{width:"24%"}}>
            <DashboardCard
              title="Low Stock Items"
              metric="158"
              icon={<ErrorOutlineIcon />}
              color="#e74c3c"
            />
          </Grid>
          <Grid item sx={{width:"24%"}}>
            <DashboardCard
              title="Total Sales This Month"
              metric="$450,000"
              icon={<ShoppingCartIcon />}
              color="#2ecc71"
            />
          </Grid>
          <Grid item sx={{width:"24%"}}>
            <DashboardCard
              title="Revenue This Month"
              metric="1,200,000"
              icon={<CurrencyRupeeIcon />}
              color="#f39c12"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage;
