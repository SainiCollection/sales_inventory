import React from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { logout } from "../../modules/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const Header = () => {
    const dispatch = useAppDispatch();

    const navItems = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Inventory", path: "/inventory" },
        { label: "Sales", path: "/sales" },
        { label: "Accounts", path: "/accounts" },
    ];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Define a primary color for a clean, professional look (e.g., a nice blue)
    const primaryColor = "#1976D2"; // Material-UI Blue

    return (
        <AppBar
            position="static"
            elevation={2}
            sx={{
                // Set background to white
                backgroundColor: "#fff",
                // Set default text color to a dark shade (e.g., for icons/elements without specific color)
                color: "#212121", // Very dark gray/almost black
                // Professional, subtle shadow
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                borderBottom: `1px solid #e0e0e0`, // Add a subtle bottom border
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Brand Logo */}
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        fontWeight: "bold",
                        letterSpacing: 0.5,
                        // Change text color to a dark shade for visibility on white background
                        color: "#212121",
                    }}
                >
                    AutoParts IMS
                </Typography>

                {/* Nav Links + Avatar */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {navItems.map((item) => (
                        <Button
                            key={item.path}
                            component={NavLink}
                            to={item.path}
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                // Link color - use a slightly lighter dark color
                                color: "#616161",
                                px: 2,
                                fontSize: "0.95rem",
                                borderRadius: 1,
                                "&.active": {
                                    // Active link: primary color text, and a slight background highlight
                                    backgroundColor: "rgba(25, 118, 210, 0.08)", // primaryColor with opacity
                                    color: primaryColor,
                                    fontWeight: "bold",
                                },
                                "&:hover": {
                                    // Hover effect: slight gray background
                                    backgroundColor: "#f5f5f5",
                                    color: primaryColor, // Use primary color on hover for professionalism
                                },
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}

                    {/* Avatar with menu */}
                    <IconButton onClick={handleMenuOpen} sx={{ p: 0.5, ml: 1 }}>
                        <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        PaperProps={{
                            sx: {
                                // Background is already white, but ensure text is black/dark
                                backgroundColor: "#fff",
                                color: "#212121",
                                minWidth: 160,
                                boxShadow: "0px 4px 12px rgba(0,0,0,0.15)", // A slightly stronger menu shadow
                                "& .MuiMenuItem-root": {
                                    fontSize: "0.95rem",
                                    "&:hover": {
                                        // Slight hover color for menu items
                                        backgroundColor: "rgba(25, 118, 210, 0.05)",
                                        color: primaryColor,
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                dispatch(logout());
                            }}
                            sx={{ color: 'error.main' }} // Optionally highlight logout
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>

    );
};

export default Header;