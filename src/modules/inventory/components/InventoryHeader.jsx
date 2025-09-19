import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


export default function InventoryHeader() {
  return (
    <Box sx={{ flexGrow: 1, pb:2, width:"100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Inventory Management
          </Typography>
          <Button variant="contained" color='warning' startIcon={<AddIcon />}>Add New Product</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
