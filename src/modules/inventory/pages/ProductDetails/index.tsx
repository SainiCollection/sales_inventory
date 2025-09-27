import React from 'react';
import { 
    Box, 
    Typography, 
    Divider, 
    Paper, 
    Chip,
    useTheme,
    Stack, // <-- Using Stack for vertical alignment and spacing
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import ScheduleIcon from '@mui/icons-material/Schedule';
import UpdateIcon from '@mui/icons-material/Update';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NumbersIcon from '@mui/icons-material/Numbers';

// --- Interface and Mock Data (Unchanged) ---
interface Product {
    id: number;
    productName: string;
    sku: string;
    brand: string;
    category: string;
    description: string;
    imageUrl: string;
    quantity: number;
    location: string;
    vendor: string;
    purchasePrice: number;
    sellingPrice: number;
    vendorPrice: number;
    compatibility: string[];
    engineType: string[];
    manufacturerPartNo: string;
    dateAdded: string; 
    dateUpdated: string;
    technicalSpecs: {
        weight: string;
        material: string;
        dimensions: string;
        warranty: string;
    };
}

const mockProduct: Product = {
    id: 456137,
    productName: "Turbocharger Assembly (GTX-Series)",
    description: 'High-performance twin-scroll turbocharger designed for forced induction in both diesel and high-octane petrol engines, significantly boosting efficiency and power. Recommended for performance upgrades and standard replacements.',
    sku: "TCH-A-45", 
    imageUrl: "https://5.imimg.com/data5/NP/SR/MY-11301189/car-turbo-charger.jpg",
    quantity: 10,
    brand: "Garrett",
    category: "Engine",
    vendor: "BoostTech",
    location: 'Aisle T, Rack 03, Bin 1A',
    purchasePrice: 480.00,
    sellingPrice: 650.00,
    vendorPrice: 560.00,
    compatibility: ["Audi Q5 2013-2019 (2.0T)", "BMW X3 2012-2018 (3.0L)"],
    engineType: ["Diesel", "Petrol"],
    manufacturerPartNo: 'GAR-GTX-9000',
    dateAdded: '2023-08-15', 
    dateUpdated: '2024-09-27',
    technicalSpecs: {
        weight: '6.5 kg',
        material: 'Inconel Turbine Wheel',
        dimensions: '30cm x 20cm x 25cm',
        warranty: '12 Months / Unlimited km',
    }
};

const formatRupee = (amount: number) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
const product = mockProduct; 
// --- End of Data ---


export default function ProductDetailPage() {
    const theme = useTheme();
    const profitMargin = product.sellingPrice - product.purchasePrice;

    // Compact DetailRow component
    const DetailRow = ({ label, value, color='text.primary', icon }: { label: string, value: string | number, color?: string, icon?: React.ReactNode }) => (
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ py: 0.5 }}>
            <Box display="flex" alignItems="center">
                {icon && <Box sx={{ mr: 1, color: 'text.secondary', fontSize: 'small' }}>{icon}</Box>}
                <Typography variant="body2" color="text.secondary">
                    {label}
                </Typography>
            </Box>
            <Typography variant="body2" fontWeight="medium" color={color}>
                {value}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
            
            {/* 1. Page Header */}
            <Box sx={{ mb: 4, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Typography variant="caption" color="text.secondary" fontWeight="medium" mb={0.5}>
                    Inventory {'>'} {product.category} {'>'} **{product.sku}**
                </Typography>
                <Typography variant="h4" fontWeight="700" color="text.primary" sx={{ lineHeight: 1.1 }}>
                    {product.productName}
                </Typography>
            </Box>

            {/* 2. Main Content Layout (Flexbox for two columns) */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    gap: 3, // Consistent spacing between major columns
                    alignItems: 'stretch', // Ensures columns stretch to the height of the tallest item in the row
                }}
            >
                
                {/* LEFT COLUMN: Primary Details & Compatibility (Approx 65% width on LG+) */}
                <Stack 
                    spacing={3} 
                    sx={{ 
                        width: { xs: '100%', lg: '65%' }, // 65% width
                        flexShrink: 0,
                        flexGrow: 1, 
                    }}
                >
                    
                    {/* 2.1. TOP BLOCK: Image, Identification, Overview */}
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                        <Stack spacing={3}>
                            
                            {/* A. Image and Core Identification (Horizontal on SM+) */}
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                                {/* Product Image */}
                                <Box
                                    sx={{
                                        width: { xs: '100%', sm: 200 },
                                        height: 200,
                                        bgcolor: 'grey.100',
                                        borderRadius: 1,
                                        flexShrink: 0,
                                        backgroundImage: `url(${product.imageUrl})`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        border: '1px solid #e0e0e0'
                                    }}
                                />

                                {/* Core Details and Stock */}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Box display="flex" flexWrap="wrap" gap={1} mb={1.5}>
                                        <Chip icon={<CategoryIcon fontSize="small" />} label={product.category} color="info" size="small" sx={{ fontWeight: 'medium' }} />
                                        <Chip label={`Brand: ${product.brand}`} variant="outlined" size="small" />
                                    </Box>
                                    
                                    {/* Stock Status Highlight */}
                                    <Box display="flex" alignItems="center" color={product.quantity > 5 ? 'success.main' : 'warning.main'} mb={2} sx={{ 
                                        p: 1, 
                                        bgcolor: product.quantity > 5 ? theme.palette.success.light + '1A' : theme.palette.warning.light + '1A', 
                                        borderRadius: 1 
                                    }}>
                                        <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                                        <Typography variant="h6" fontWeight="bold">
                                            {product.quantity} Units In Stock
                                        </Typography>
                                    </Box>
                                    
                                    <DetailRow label="SKU" value={product.sku} icon={<NumbersIcon fontSize="inherit" />} />
                                    <DetailRow label="Mfr. Part No." value={product.manufacturerPartNo} icon={<NumbersIcon fontSize="inherit" />} />
                                    <DetailRow label="Location" value={product.location} icon={<LocationOnIcon fontSize="inherit" />} />
                                    <DetailRow label="Vendor/Supplier" value={product.vendor} icon={<AccountTreeIcon fontSize="inherit" />} />
                                </Box>
                            </Box>
                            
                            <Divider />

                            {/* B. Product Overview */}
                            <Box>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Product Overview
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                    
                    {/* 2.2. BOTTOM BLOCK: Compatibility and Technical Specs (Placed in the same main column) */}
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                            Technical Specifications & Compatibility
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} divider={<Divider orientation='vertical' flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />}>
                            
                            {/* Technical Specs */}
                            <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
                                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                    Specifications
                                </Typography>
                                <Stack spacing={0.5}>
                                    {Object.entries(product.technicalSpecs).map(([key, value]) => (
                                        <DetailRow 
                                            key={key}
                                            label={key.replace(/([A-Z])/g, ' $1').trim()} 
                                            value={value} 
                                        />
                                    ))}
                                </Stack>
                            </Box>
                            
                            {/* Compatibility Chips */}
                            <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
                                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                    Compatibility
                                </Typography>
                                
                                <Box mb={2}>
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <AccountTreeIcon fontSize="small" sx={{ mr: 1, color: theme.palette.info.main }} />
                                        <Typography variant="body2" fontWeight="medium">Compatible Vehicles</Typography>
                                    </Box>
                                    <Box display="flex" flexWrap="wrap" gap={1}>
                                        {product.compatibility.map((item, index) => (
                                            <Chip key={index} label={item} size="small" variant="outlined" color="primary" />
                                        ))}
                                    </Box>
                                </Box>
                                
                                <Box>
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <PriceCheckIcon fontSize="small" sx={{ mr: 1, color: theme.palette.info.main }} />
                                        <Typography variant="body2" fontWeight="medium">Engine Types</Typography>
                                    </Box>
                                    <Box display="flex" flexWrap="wrap" gap={1}>
                                        {product.engineType.map((item, index) => (
                                            <Chip key={index} label={item} size="small" color="secondary" />
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </Stack>
                    </Paper>
                </Stack>


                {/* RIGHT COLUMN: Financial Details & Audit Log (Approx 35% width on LG+) */}
                <Stack 
                    spacing={3} 
                    sx={{ 
                        width: { xs: '100%', lg: '35%' }, // 35% width
                        flexShrink: 0,
                        flexGrow: 1,
                    }}
                >
                    
                    {/* 2.3. FINANCIAL DETAILS */}
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                            Financial Details
                        </Typography>
                        
                        <Divider sx={{ mb: 1.5 }} />

                        {/* Selling Price (Highlight) */}
                        <Box sx={{ mb: 2, p: 2, bgcolor: theme.palette.primary.light + '1A', borderRadius: 1, border: `1px solid ${theme.palette.primary.main}` }}>
                            <Typography variant="body2" color="text.secondary">
                                Internal Selling Price
                            </Typography>
                            <Box display="flex" alignItems="center" color="primary.dark">
                                <AttachMoneyIcon sx={{ mr: 1, fontSize: 28 }} />
                                <Typography variant="h5" fontWeight="bold">
                                    {formatRupee(product.sellingPrice)}
                                </Typography>
                            </Box>
                        </Box>
                        
                        <DetailRow label="Purchase Price (Your Cost)" value={formatRupee(product.purchasePrice)} />
                        <DetailRow label="Vendor Suggested Price" value={formatRupee(product.vendorPrice)} />

                        {/* Profit Margin */}
                        <Divider sx={{ my: 1.5 }} />
                        <DetailRow 
                            label="Estimated Margin" 
                            value={formatRupee(profitMargin)} 
                            color={profitMargin > 0 ? theme.palette.success.dark : theme.palette.error.dark}
                            icon={<PriceCheckIcon fontSize="inherit" />}
                        />
                    </Paper>

                    {/* 2.4. AUDIT LOG */}
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                            Data Audit Log
                        </Typography>
                        <Divider sx={{ mb: 1.5 }} />

                        <Stack spacing={1}>
                            <Box display="flex" alignItems="center" color="text.primary">
                                <ScheduleIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                                <Typography variant="body2" fontWeight="medium">
                                    Date Added: <Box component="span" fontWeight="normal" color="text.secondary">{product.dateAdded}</Box>
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" color="text.primary">
                                <UpdateIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                                <Typography variant="body2" fontWeight="medium">
                                    Last Update: <Box component="span" fontWeight="normal" color="text.secondary">{product.dateUpdated}</Box>
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Stack>

            </Box>
        </Box>
    );
}