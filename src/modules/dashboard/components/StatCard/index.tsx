// StatCard.tsx

import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';

interface StatCardProps {
    title: string;
    value: string; // Keep as string to handle currency symbols easily
    change?: string; // e.g., "20%"
    changeDescription?: string; // e.g., "Than Last Month"
    icon: React.ReactNode; // Pass an MUI Icon component
    iconBgColor?: string; // Background color for the icon circle
    changeType?: 'increase' | 'decrease' | 'neutral'; // For coloring the change text
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    iconBgColor = '#ede7f6', // Default light purple/lavender
}) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 250,
                bgcolor: 'background.paper',
                border: '1px solid #e0e0e0', // Slightly more defined border
                
                // 🌟 CLEARER PROFESSIONAL SHADOW
                // Increased opacity (0.1) and spread (4px) for a clearer definition.
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-2px)', // Subtle lift
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)', // Shadow darkens slightly on hover
                },
            }}
        >
            {/* TOP SECTION: Icon, Title, and Value (Aligned Horizontally) */}
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexGrow: 1,
                mb: 1, 
            }}>
                {/* Icon Container (Left) */}
                <Box
                    sx={{
                        bgcolor: iconBgColor,
                        borderRadius: '8px', 
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        '& .MuiSvgIcon-root': {
                            color: theme.palette.primary.dark,
                            fontSize: '1.7rem',
                        },
                    }}
                >
                    {icon}
                </Box>
                
                {/* Title & Value Container (Right - Stacked Vertically) */}
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                }}>
                    <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        fontWeight="medium" 
                        sx={{ lineHeight: 1.2 }}
                    >
                        {title}
                    </Typography>
                    <Typography 
                        variant="h4" 
                        component="div" 
                        fontWeight="bold" 
                        sx={{ color: theme.palette.text.primary, lineHeight: 1.2 }}
                    >
                        {value}
                    </Typography>
                </Box>
            </Box>

            {/* BOTTOM SECTION: Change indicator (Functional) */}
            {/* {change && changeDescription && (
                <Box sx={{ display: 'flex', alignItems: 'center', pt: 1, borderTop: '1px solid #f5f5f5' }}>
                    {getChangeIcon()}
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ color: getChangeColor(), mr: 0.5 }}
                    >
                        {change}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {changeDescription}
                    </Typography>
                </Box>
            )} */}
        </Paper>
    );
};

export default StatCard;