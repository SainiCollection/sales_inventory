// Save this as AddProductButton.tsx

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from "@mui/icons-material/Add";
// Import the separate form component
import AddProductForm from '../AddProductForm';

interface AddProductButtonProps {
    open: boolean; // Prop to control the display of the "Add New Product" text
}

const AddProductButton: React.FC<AddProductButtonProps> = ({ open }) => {
    // 1. State to manage the visibility of the modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 2. Handlers to open and close the modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <React.Fragment>
            {/* The Button Component */}
            <List sx={{ p: 0 }}>
                <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                        onClick={handleOpenModal} // Attached the click handler to open the modal
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2,
                            borderRadius: 1,
                            backgroundColor: "#ff9800", // filled orange
                            color: "#fff",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#fb8c00",
                                boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
                            },
                        }}
                    >
                        <Tooltip title="Add New Product" >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : "auto",
                                    justifyContent: "center",
                                    color: "#fff",
                                }}
                            >
                                <AddIcon fontSize="medium" />
                            </ListItemIcon>
                        </Tooltip>

                        {open && (
                            <ListItemText
                                primary="Add New Product"
                                sx={{
                                    "& .MuiTypography-root": { fontSize: "1rem", fontWeight: "bold" },
                                }}
                            />
                        )}
                    </ListItemButton>
                </ListItem>
            </List>

            {/* The Modal Component (rendered by the button component) */}
            <AddProductForm
                open={isModalOpen} // Controls the form's visibility
                onClose={handleCloseModal} // Allows the form to close itself
            />
        </React.Fragment>
    );
}

export default AddProductButton;