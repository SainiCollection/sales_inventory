// CartPage.tsx
import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import CartSummary from '../components/CartSummary';
import CartItemList from '../components/CartItemList';

// Sample data structure for a cart item
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

const initialCartItems: CartItem[] = [
    { id: '1001', productName: 'Gearbox Assembly', sku: 'GBX-A-45', unitPrice: 1200.0, requestedQuantity: 2, availableStock: 15, imageUrl: "https://5.imimg.com/data5/WN/LN/ZL/SELLER-1026424/gear-box-assembly.jpg", category: "Parts" },
    { id: '1002', productName: 'Oil Filter Pack (10x)', sku: 'OFL-P-10', unitPrice: 45.5, requestedQuantity: 5, availableStock: 100, imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/5/305941306/LK/HK/TQ/32976270/hydraulic-oil-filter.jpeg", category: "Engine" },
    { id: '1003', productName: 'Brake Pad Set', sku: 'BPS-X-22', unitPrice: 85.0, requestedQuantity: 1, availableStock: 5, imageUrl: "https://m.media-amazon.com/images/I/71uLQVjm1pL.jpg", category: "Braking System" },
];

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const calculateTotal = () =>
        cartItems.reduce((sum, item) => sum + item.unitPrice * item.requestedQuantity, 0);

    const updateQuantity = (id: string, newQuantity: number) => {
        setCartItems(prev =>
            prev.map(item => (item.id === id ? { ...item, requestedQuantity: newQuantity } : item))
        );
    };

    const removeItem = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const handleCheckout = () => {
        // Calculate the total including a mock 18% tax for the alert
        const finalTotal = calculateTotal() * 1.18; 
        alert(`Proceeding to Order Request with total: ₹${finalTotal.toFixed(2)}. This is where you would call your API.`);
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear the entire cart?')) {
            setCartItems([]);
        }
    };

  
    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f4f6f8', height: 'calc(100vh - 70px)' }}>

            {/* --- PROFESSIONAL PAGE HEADER SECTION (INLINE) --- */}
            <Box 
                sx={{ 
                    mb: 4, 
                    pb: 2, 
                    // Visual separation and clean background
                    borderBottom: '1px solid #e0e0e0',
                    bgcolor: 'white', 
                    borderRadius: 1,
                    p: { xs: 2, md: 3 }
                }}
            >
                {/* Main Title */}
                <Typography variant="h4" fontWeight="700" color="text.primary" gutterBottom sx={{ lineHeight: 1 }}>
                    Order Preparation Cart
                </Typography>
                
                {/* Subtitle/Description */}
                <Typography variant="subtitle1" color="text.secondary">
                    Review and finalize items staged for your internal request or external purchase.
                </Typography>
            </Box>
            {/* -------------------------------------------------- */}


            {/* --- MAIN CONTENT LAYOUT CONTAINER (FLEXBOX) --- */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4,
                    alignItems: 'flex-start',
                }}
            >
                {/* 1. Main Content - Cart Items List */}
                <Box
                    sx={{
                        flexGrow: 1,
                        flexBasis: { xs: '100%', md: '66.666%' },
                        maxWidth: { xs: '100%', md: '66.666%' },
                        minWidth: 300,
                    }}
                >
                    <CartItemList
                        items={cartItems}
                        onUpdateQuantity={updateQuantity}
                        onRemoveItem={removeItem}
                    />
                </Box>

                {/* 2. Sidebar - Cart Summary */}
                <Box
                    sx={{
                        flexShrink: 0,
                        flexBasis: { xs: '100%', md: '33.333%' },
                        maxWidth: { xs: '100%', md: '33.333%' },
                        minWidth: 250,
                        position: { md: 'sticky' },
                        top: { md: 24 },
                    }}
                >
                    <CartSummary
                        total={calculateTotal()}
                        itemCount={cartItems.length}
                        onCheckout={handleCheckout}
                        onClearCart={handleClearCart}
                    />
                </Box>
            </Box>
        </Box>
    );
}