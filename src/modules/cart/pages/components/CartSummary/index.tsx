// CartSummary.tsx
import React from 'react';
import { 
    Paper, 
    Typography, 
    Box, 
    Divider, 
    Button,
    useTheme
} from '@mui/material';

interface CartSummaryProps {
    total: number;
    itemCount: number;
    onCheckout: () => void;
    onClearCart: () => void;
}

// Helper function to format currency
const formatRupee = (amount: number) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

export default function CartSummary({ total, itemCount, onCheckout, onClearCart }: CartSummaryProps) {
    const theme = useTheme();
    const isCartEmpty = itemCount === 0;

    return (
        <Paper 
            sx={{ 
                p: 3, 
                borderRadius: 2, 
                border: '1px solid #e0e0e0',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }} 
            elevation={0}
        >
            <Typography variant="h6" gutterBottom fontWeight="bold" color="text.primary">
                Order Request Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body1" color="text.secondary">
                    Total Products:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                    {itemCount}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Estimated Tax/GST (18%):
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                    {formatRupee(total * 0.18)}
                </Typography>
            </Box>
            
            <Divider sx={{ mb: 2 }} />

            {/* Total Highlighted with contrast and a slight shadow */}
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    mb: 3, 
                    p: 2,
                    bgcolor: theme.palette.primary.main,
                    borderRadius: 1,
                    color: theme.palette.primary.contrastText,
                    // Advanced total highlight shadow
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.5)', 
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Final Price:
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                    {formatRupee(total * 1.18)}
                </Typography>
            </Box>

            <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={onCheckout}
                disabled={isCartEmpty}
                sx={{ mb: 1.5, textTransform: 'uppercase' }}
            >
                Finalize & Submit Request
            </Button>
            
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={onClearCart}
                disabled={isCartEmpty}
                sx={{ textTransform: 'uppercase' }}
            >
                Clear Cart
            </Button>
        </Paper>
    );
}