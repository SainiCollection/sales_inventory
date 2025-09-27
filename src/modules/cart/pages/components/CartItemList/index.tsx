// CartItemList.tsx
import React from 'react';
import { 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography, 
    IconButton,
    TextField,
    Box,
    useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; 

// 1. UPDATED INTERFACE (no change needed here)
interface CartItem {
    id: string;
    productName: string;
    sku: string;
    unitPrice: number;
    requestedQuantity: number;
    availableStock: number;
    imageUrl: string; 
    category: string;
}

interface CartItemListProps {
    items: CartItem[];
    onUpdateQuantity: (id: string, newQuantity: number) => void;
    onRemoveItem: (id: string) => void;
}

// Helper function to format currency
const formatRupee = (amount: number) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

export default function CartItemList({ items, onUpdateQuantity, onRemoveItem }: CartItemListProps) {
    const theme = useTheme();

    if (items.length === 0) {
        // ... (Empty cart display remains the same)
        return (
            <Paper 
                sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    borderRadius: 2, 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                }} 
                elevation={0}
            >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    🛒 Your order cart is empty.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Use the inventory search to stage items for your request.
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer 
            component={Paper} 
            elevation={0} 
            sx={{ 
                borderRadius: 2, 
                border: '1px solid #e0e0e0',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', 
            }}
        >
            <Table>
                <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', width: '40%' }}>Product & Details</TableCell> 
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Unit Price</TableCell>
                        <TableCell align="center" sx={{ width: 150, fontWeight: 'bold' }}>Requested Qty</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Subtotal</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => {
                        const subtotal = item.unitPrice * item.requestedQuantity;
                        const isOverstock = item.requestedQuantity > item.availableStock;
                        const qtyError = isOverstock ? 'Stock limit exceeded' : '';

                        return (
                            <TableRow 
                                key={item.id} 
                                sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                                    '&:hover': { bgcolor: theme.palette.grey[50] } 
                                }}
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                        {/* Product Image Placeholder */}
                                        <Box 
                                            sx={{ 
                                                width: 60, 
                                                height: 60, 
                                                borderRadius: 1, 
                                                bgcolor: theme.palette.grey[200],
                                                flexShrink: 0,
                                                backgroundImage: `url(${item.imageUrl})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                border: `1px solid ${theme.palette.grey[300]}`
                                            }}
                                        >
                                            {!item.imageUrl && (
                                                <Typography variant="caption" sx={{ p: 0.5, color: theme.palette.text.secondary }}>
                                                    Img
                                                </Typography>
                                            )}
                                        </Box>

                                        {/* Product Text Details */}
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="600" color="text.primary" lineHeight={1.2}>
                                                {item.productName}
                                            </Typography>
                                            
                                            {/* --- START OF SIDE-BY-SIDE LAYOUT --- */}
                                            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                                {/* CATEGORY CHIP */}
                                                <Typography variant="caption" 
                                                    sx={{ 
                                                        color: theme.palette.info.contrastText, 
                                                        bgcolor: theme.palette.info.main, 
                                                        borderRadius: '4px', p: '2px 6px',
                                                        fontWeight: 'medium',
                                                    }}
                                                >
                                                    {item.category} 
                                                </Typography>
                                                
                                                {/* SKU */}
                                                <Typography variant="caption" color="text.secondary" fontWeight="medium">
                                                    SKU: {item.sku}
                                                </Typography>
                                            </Box>
                                            {/* --- END OF SIDE-BY-SIDE LAYOUT --- */}
                                            
                                            {/* Stock Status Chip */}
                                            <Box display="flex" alignItems="center" mt={1}>
                                                {isOverstock ? (
                                                    <Typography variant="caption" 
                                                        sx={{ 
                                                            color: theme.palette.error.contrastText, 
                                                            bgcolor: theme.palette.error.main, 
                                                            borderRadius: '4px', p: '2px 6px' 
                                                        }} 
                                                        fontWeight="medium"
                                                    >
                                                        <WarningIcon sx={{ mr: 0.5, verticalAlign: 'middle', color: 'inherit' }} fontSize="inherit" />
                                                        STOCK ALERT ({item.availableStock} available)
                                                    </Typography>
                                                ) : (
                                                    <Typography variant="caption" 
                                                        sx={{ 
                                                            color: theme.palette.success.contrastText, 
                                                            bgcolor: theme.palette.success.main, 
                                                            borderRadius: '4px', p: '2px 6px' 
                                                        }} 
                                                        fontWeight="medium"
                                                    >
                                                        <CheckCircleOutlineIcon sx={{ mr: 0.5, verticalAlign: 'middle', color: 'inherit' }} fontSize="inherit" />
                                                        In Stock
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                </TableCell>
                                
                                {/* Unit Price */}
                                <TableCell align="right">
                                    <Typography variant="body1" fontWeight="medium">
                                        {formatRupee(item.unitPrice)}
                                    </Typography>
                                </TableCell>
                                
                                {/* Quantity Input */}
                                <TableCell align="center">
                                    <TextField
                                        type="number"
                                        size="small"
                                        variant="outlined"
                                        value={item.requestedQuantity}
                                        onChange={(e) => {
                                            const newQty = parseInt(e.target.value) || 1;
                                            onUpdateQuantity(item.id, Math.max(1, newQty));
                                        }}
                                        inputProps={{ min: 1 }}
                                        sx={{ width: 100 }}
                                        error={isOverstock}
                                        helperText={qtyError}
                                    />
                                </TableCell>
                                
                                {/* Subtotal */}
                                <TableCell align="right">
                                    <Typography variant="h6" fontWeight="bold" color="text.primary">
                                        {formatRupee(subtotal)}
                                    </Typography>
                                </TableCell>
                                
                                {/* Delete Button */}
                                <TableCell align="center">
                                    <IconButton 
                                        color="error" 
                                        onClick={() => onRemoveItem(item.id)}
                                        aria-label={`Remove ${item.productName}`}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}