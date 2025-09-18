import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory2';
import SalesIcon from '@mui/icons-material/PointOfSale';
import HelpIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../atom/LogoutButton';

const drawerWidth = 220;

const Sidebar = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    <Toolbar>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h6">AutoParts</Typography>
      </Box>
    </Toolbar>
    <Divider /> <Divider /> <Divider /> <Divider /> <Divider /> <Divider />
    <Box display="flex" flexDirection="column" height="100%">
      <List>
        <ListItemButton
          component={NavLink}
          to="/dashboard"
          sx={{
            "&.active": {
              backgroundColor: "rgba(25, 118, 210, 0.08)", // active highlight
              color: "primary.main",
              "& .MuiListItemIcon-root": {
                color: "primary.main", // also change icon color
              },
              "& .MuiListItemText-root": {
                color: "primary.main", // also change text color
              },
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={NavLink}
          to="/inventory"
          sx={{
            "&.active": {
              backgroundColor: "rgba(25, 118, 210, 0.08)", // active highlight
              color: "primary.main",
              "& .MuiListItemIcon-root": {
                color: "primary.main", // also change icon color
              },
              "& .MuiListItemText-root": {
                color: "primary.main", // also change text color
              },
            },
          }}>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItemButton>

        <ListItemButton component={NavLink}
          to="/sales"
          sx={{
            "&.active": {
              backgroundColor: "rgba(25, 118, 210, 0.08)", // active highlight
              color: "primary.main",
              "& .MuiListItemIcon-root": {
                color: "primary.main", // also change icon color
              },
              "& .MuiListItemText-root": {
                color: "primary.main", // also change text color
              },
            },
          }}>
          <ListItemIcon>
            <SalesIcon />
          </ListItemIcon>
          <ListItemText primary="Sales" />
        </ListItemButton>

        <ListItemButton component={NavLink}
          to="/accounts"
          sx={{
            "&.active": {
              backgroundColor: "rgba(25, 118, 210, 0.08)", // active highlight
              color: "primary.main",
              "& .MuiListItemIcon-root": {
                color: "primary.main", // also change icon color
              },
              "& .MuiListItemText-root": {
                color: "primary.main", // also change text color
              },
            },
          }}>
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText primary="Accounts" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>

      <Box sx={{ mt: "auto" }}>
      <LogoutButton/>
    </Box>
    </Box>
  </Drawer>
);

export default Sidebar;
