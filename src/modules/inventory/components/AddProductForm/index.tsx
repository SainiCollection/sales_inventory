import React, { useState, useEffect } from "react";
import {
    Modal, Box, Typography, TextField, Button, Select, MenuItem,
    InputLabel, FormControl, Chip, Stack, FormHelperText,
    Divider, IconButton, Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete'; // Import for the remove image button

// --- Interfaces and Constants ---

interface ProductFormData {
    name: string; brand: string; category: string; sku: string; quantity: number | string;
    vendor: string; purchase_price: number | string; selling_price: number | string;
    vendor_price: number | string; engine_type?: string[]; compatibility?: string;
}

const CATEGORY_FIELDS: { [key: string]: string[] } = {
    Engine: ["engine_type", "compatibility"],
    Brakes: ["compatibility"],
    Body: ["compatibility"],
    Electrical: ["engine_type"],
    Suspension: [],
};

// Initial state for easy resetting
const INITIAL_FORM_DATA: ProductFormData = {
    name: "", brand: "", category: "", sku: "", quantity: "", vendor: "",
    purchase_price: "", selling_price: "", vendor_price: "",
};

interface AddProductFormProps {
    open: boolean;
    onClose: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ open, onClose }) => {
    const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);
    const [productImage, setProductImage] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // New state for preview URL
    const [newCompatibility, setNewCompatibility] = useState("");
    const [compatibilityList, setCompatibilityList] = useState<string[]>([]);
    const [engineTypeList, setEngineTypeList] = useState<string[]>([]);

    const availableCategories = Object.keys(CATEGORY_FIELDS);
    const availableEngineTypes = ["Diesel", "Petrol", "Electric", "Hybrid"];

    // Cleanup Effect: Revoke the object URL when component unmounts or image changes
    useEffect(() => {
        return () => {
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        };
    }, [imagePreviewUrl]);


    // --- Handlers ---
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string, value: unknown } }) => {
        const { name, value } = e.target;
        if (name === "category" && value !== formData.category) {
            setEngineTypeList([]);
            setCompatibilityList([]);
            setNewCompatibility("");
            setFormData({ ...formData, engine_type: undefined, compatibility: undefined, [name]: value as string });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setProductImage(file);
            // Create a temporary URL for image preview
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setProductImage(null);
        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
        }
        setImagePreviewUrl(null);
    };
    
    const handleAddCompatibility = () => {
        if (newCompatibility.trim() && !compatibilityList.includes(newCompatibility.trim())) {
            setCompatibilityList([...compatibilityList, newCompatibility.trim()]);
            setNewCompatibility("");
        }
    };

    const handleDeleteCompatibility = (chipToDelete: string) => () => {
        setCompatibilityList((chips) => chips.filter((chip) => chip !== chipToDelete));
    };

    const handleEngineTypeToggle = (type: string) => {
        setEngineTypeList(prev => 
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };
    
    // Reset function
    const handleReset = () => {
        setFormData(INITIAL_FORM_DATA);
        setCompatibilityList([]);
        setEngineTypeList([]);
        handleRemoveImage(); // Clears image and preview
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // ... (API submission logic here)
        console.log("Submitting new product. Image file attached:", !!productImage);
        
        onClose();
        handleReset(); // Reset the form after submission
    };

    // --- Utility Functions ---

    const isFieldRequired = (fieldName: string) => {
        const requiredFields = CATEGORY_FIELDS[formData.category] || [];
        return requiredFields.includes(fieldName);
    };

    // --- Styles for Full-Size Modal ---
    const fullScreenStyle = {
        position: 'absolute' as 'absolute',
        top: '5%',
        left: '5%',
        width: '90%',
        height: '90%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <Modal open={open} onClose={onClose} disableEscapeKeyDown>
            <Box sx={fullScreenStyle}>
                
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Add New Inventory Product
                    </Typography>
                    <IconButton onClick={onClose} size="large" sx={{ color: '#616161' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 3 }} />

                {/* Main Form Area (scrollable) */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 2 }}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            
                            {/* SECTION 1: IMAGE UPLOAD & PREVIEW */}
                            <Box sx={{ border: '1px dashed #ccc', p: 3, borderRadius: 1, backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', gap: 4 }}>
                                
                                {/* Image Upload Controls */}
                                <Box>
                                    <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 1 }}>Product Image</Typography>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <FormControl>
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                type="file"
                                                onChange={handleImageUpload}
                                                onClick={(event) => { (event.target as HTMLInputElement).value = ''; }} // Allows re-uploading the same file
                                            />
                                            <label htmlFor="raised-button-file">
                                                <Button 
                                                    variant="contained" 
                                                    component="span" 
                                                    startIcon={<CloudUploadIcon />}
                                                    color="secondary"
                                                >
                                                    {productImage ? "Change Photo" : "Upload Photo"}
                                                </Button>
                                            </label>
                                        </FormControl>
                                        {productImage && (
                                            <Button 
                                                variant="text" 
                                                onClick={handleRemoveImage} 
                                                startIcon={<DeleteIcon />} 
                                                color="error" 
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </Stack>
                                    {productImage && (
                                        <FormHelperText sx={{ mt: 1, color: 'success.main' }}>
                                            File Ready: {productImage.name} ({(productImage.size / 1024 / 1024).toFixed(2)} MB)
                                        </FormHelperText>
                                    )}
                                </Box>

                                {/* Image Preview */}
                                <Box sx={{ ml: 'auto', p: 1, border: '1px solid #ddd', borderRadius: 1 }}>
                                    {imagePreviewUrl ? (
                                        <Avatar 
                                            src={imagePreviewUrl} 
                                            alt="Product Preview" 
                                            variant="rounded" 
                                            sx={{ width: 100, height: 100, objectFit: 'contain' }} 
                                        />
                                    ) : (
                                        <Avatar 
                                            variant="rounded" 
                                            sx={{ width: 100, height: 100, bgcolor: '#e0e0e0' }}
                                        >
                                            <CloudUploadIcon sx={{ color: '#9e9e9e' }} />
                                        </Avatar>
                                    )}
                                </Box>
                            </Box>

                            <Divider />

                            {/* SECTION 2: CORE PRODUCT INFO */}
                            <Box>
                                <Typography variant="h6" gutterBottom color="primary">Core Product Details</Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} useFlexGap flexWrap="wrap">
                                    <TextField sx={{ flex: '1 1 30%' }} required label="Product Name" name="name" value={formData.name} onChange={handleChange} />
                                    <TextField sx={{ flex: '1 1 30%' }} required label="Brand" name="brand" value={formData.brand} onChange={handleChange} />
                                    <FormControl sx={{ flex: '1 1 30%' }} required>
                                        <InputLabel>Category</InputLabel>
                                        <Select label="Category" name="category" value={formData.category} onChange={handleChange}>
                                            {availableCategories.map((cat) => (<MenuItem key={cat} value={cat}>{cat}</MenuItem>))}
                                        </Select>
                                    </FormControl>
                                    
                                    <TextField sx={{ flex: '1 1 30%' }} required label="SKU (Unique Code)" name="sku" value={formData.sku} onChange={handleChange} />
                                    <TextField sx={{ flex: '1 1 30%' }} required label="Vendor / Supplier" name="vendor" value={formData.vendor} onChange={handleChange} />
                                    <TextField sx={{ flex: '1 1 30%' }} required label="Quantity in Stock" name="quantity" type="number" inputProps={{ min: 1 }} value={formData.quantity} onChange={handleChange} />
                                </Stack>
                            </Box>
                            
                            <Divider />

                            {/* SECTION 3: PRICING */}
                            <Box>
                                <Typography variant="h6" gutterBottom color="primary">Pricing & Costs</Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} useFlexGap flexWrap="wrap">
                                    <TextField sx={{ flex: '1 1 30%' }} required label="Purchase Price ($)" name="purchase_price" type="number" inputProps={{ step: "0.01" }} value={formData.purchase_price} onChange={handleChange} helperText="Price paid by company." />
                                    <TextField sx={{ flex: '1 1 30%' }} required label="Selling Price ($)" name="selling_price" type="number" inputProps={{ step: "0.01" }} value={formData.selling_price} onChange={handleChange} helperText="Price for customers." />
                                    <TextField sx={{ flex: '1 1 30%' }} label="Vendor Price ($)" name="vendor_price" type="number" inputProps={{ step: "0.01" }} value={formData.vendor_price} onChange={handleChange} helperText="Optional: Price from vendor." />
                                </Stack>
                            </Box>

                            <Divider />

                            {/* SECTION 4: CONDITIONAL FIELDS */}
                            {formData.category && (
                                <Box>
                                    <Typography variant="h6" gutterBottom color="primary">Category Specific Properties ({formData.category})</Typography>
                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} useFlexGap flexWrap="wrap">
                                        
                                        {/* Conditional Field: Engine Type */}
                                        {isFieldRequired("engine_type") && (
                                            <FormControl sx={{ flex: '1 1 45%' }} required>
                                                <Typography variant="body2" component="div" sx={{ mb: 1, fontWeight: 'medium' }}>Engine Type(s) Compatibility</Typography>
                                                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                                    {availableEngineTypes.map((type) => (
                                                        <Chip key={type} label={type} onClick={() => handleEngineTypeToggle(type)} color={engineTypeList.includes(type) ? "secondary" : "default"} variant={engineTypeList.includes(type) ? "filled" : "outlined"} icon={engineTypeList.includes(type) ? <DoneIcon /> : undefined} />
                                                    ))}
                                                </Stack>
                                                {engineTypeList.length === 0 && <FormHelperText error>Selection required</FormHelperText>}
                                            </FormControl>
                                        )}

                                        {/* Conditional Field: Compatibility */}
                                        {isFieldRequired("compatibility") && (
                                            <FormControl sx={{ flex: '1 1 45%' }} required>
                                                <Typography variant="body2" component="div" sx={{ mb: 1, fontWeight: 'medium' }}>Vehicle Compatibility (Add specific models)</Typography>
                                                <Stack direction="row" spacing={1} sx={{ mb: 1 }} useFlexGap flexWrap="wrap">
                                                    {compatibilityList.map((chip) => (
                                                        <Chip key={chip} label={chip} onDelete={handleDeleteCompatibility(chip)} color="primary" size="small" />
                                                    ))}
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <TextField fullWidth size="small" label="Add Compatible Model" value={newCompatibility} onChange={(e) => setNewCompatibility(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCompatibility(); } }} />
                                                    <Button variant="contained" onClick={handleAddCompatibility} startIcon={<AddIcon />} size="small">Add</Button>
                                                </Stack>
                                                {compatibilityList.length === 0 && <FormHelperText error>At least one compatibility required</FormHelperText>}
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Box>
                            )}
                        </Stack>
                    </form>
                </Box>
                
                {/* Footer / Action Buttons */}
                <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" onClick={onClose} color="secondary">Cancel</Button>
                    <Button variant="outlined" onClick={handleReset} color="error" startIcon={<DeleteIcon />}>
                        Reset Form
                    </Button>
                    <Button 
                        variant="contained" 
                        type="submit" 
                        color="primary"
                        onClick={handleSubmit} 
                        disabled={
                            !formData.name || !formData.category || Number(formData.quantity) <= 0 || 
                            (isFieldRequired('engine_type') && engineTypeList.length === 0) ||
                            (isFieldRequired('compatibility') && compatibilityList.length === 0)
                        }
                    >
                        Save Product to Inventory
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddProductForm;