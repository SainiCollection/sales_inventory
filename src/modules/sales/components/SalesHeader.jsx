import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function SalesHeader() {
  return (
    <Box sx={{ flexGrow: 1, pb:2, width:"100%" }}>
      <AppBar position="static" sx={{backgroundColor:"green"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sales
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
