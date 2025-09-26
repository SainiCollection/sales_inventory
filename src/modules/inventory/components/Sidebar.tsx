import * as React from "react";
import {
    Box,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TableFilters from "../../../components/TableFilters";
import AddProductButton from "./AddProductButton";
import InventoryIcon from '@mui/icons-material/Inventory'; // Professional icon for inventory title

const drawerWidth = 240;
const collapsedWidth = 60; // Slightly increased for better icon padding

export default function Sidebar() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => setOpen(!open);

    return (
        <Box
            sx={{
                width: open ? drawerWidth : collapsedWidth,
                transition: "width 0.3s cubic-bezier(0.4, 0, 0.6, 1)", // Smoother transition
                borderRight: "1px solid #e0e0e0", // Lighter border
                bgcolor: "#f5f5f5", // Light background color for contrast
                flexShrink: 0,
                height: "calc(100vh - 64px)", 
                display: 'flex',
                flexDirection: 'column',
                position: 'relative', // Necessary for absolute positioning of collapse button
                paddingTop: '8px',
            }}
        >
            {/* 1. Header/Collapse Control */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'space-between' : 'center',
                    px: open ? 2 : 0,
                    minHeight: 48,
                    mb: 1, // Space below the header
                }}
            >
                {/* Logo/Title Placeholder */}
                {open && (
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ color: '#333' }}>
                        <InventoryIcon color="primary" />
                        <Typography variant="subtitle1" fontWeight="bold">
                            Inventory Tools
                        </Typography>
                    </Stack>
                )}

                {/* Collapse Button (Now placed neatly inside the sidebar top) */}
                <IconButton
                    onClick={toggleDrawer}
                    sx={{
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'primary.main',
                            bgcolor: 'rgba(0, 0, 0, 0.04)',
                        },
                        p: open ? 1 : 0.5,
                        ml: open ? 0 : 'auto',
                        mr: open ? 0 : 'auto',
                    }}
                >
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>

            <Divider />

            {/* 2. Primary Action Button (Add Product) - Sticky Top */}
            <Box sx={{ p: 1, mb: 1 }}>
                <AddProductButton open={open}/>
            </Box>

            <Divider />

            {/* 3. Filter Section (Main Scrollable Content) */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 1 }}>
                <List dense sx={{ p: 0 }}>
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                minHeight: 40,
                                justifyContent: open ? "initial" : "center",
                                px: 1.5,
                                my: 0.5,
                                borderRadius: 1,
                                bgcolor: open ? 'transparent' : 'transparent', // Default state
                                '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.08)', // Light hover effect
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 1.5 : "auto",
                                    justifyContent: "center",
                                    color: 'text.secondary'
                                }}
                            >
                                <FilterAltIcon fontSize="small" />
                            </ListItemIcon>
                            {open && (
                                <ListItemText
                                    primary="Filters"
                                    sx={{ "& .MuiTypography-root": { fontSize: "0.85rem", fontWeight: 'medium' } }}
                                />
                            )}
                        </ListItemButton>
                    </ListItem>

                    {/* Filter Components */}
                    {open && (
                        <Box sx={{ mt: 1, px: 0.5 }}>
                            <TableFilters />
                        </Box>
                    )}
                </List>
            </Box>

            {/* 4. Footer (If you had bottom links/settings, they'd go here) */}
        </Box>
    );
}