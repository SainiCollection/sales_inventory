import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Paper, 
    Avatar, 
    Divider, 
    Button,
    TextField,
    Stack, 
    Chip,
    InputAdornment,
    useTheme
} from '@mui/material';
// Importing necessary MUI Icons
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import KeyIcon from '@mui/icons-material/Key';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import BadgeIcon from '@mui/icons-material/Badge';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 


// --- MOCK DATA AND INTERFACE ---
interface AdminProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    lastLogin: string;
    profilePictureUrl: string;
}

const mockAdminProfile: AdminProfile = {
    id: 'ADM001',
    firstName: 'Arjun',
    lastName: 'Sharma',
    email: 'arjun.sharma@inventotech.com',
    phoneNumber: '+91 98765 43210',
    role: 'System Administrator',
    lastLogin: '2025-09-27 10:30 AM (IST)', 
    profilePictureUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 
};
// --- END MOCK DATA ---


export default function AdminProfilePage() {
    const theme = useTheme();
    const [profile, setProfile] = useState<AdminProfile>(mockAdminProfile);
    const [isEditing, setIsEditing] = useState(false);
    
    const [editedProfile, setEditedProfile] = useState<Omit<AdminProfile, 'lastLogin'>>({
        id: mockAdminProfile.id,
        firstName: mockAdminProfile.firstName,
        lastName: mockAdminProfile.lastName,
        email: mockAdminProfile.email,
        phoneNumber: mockAdminProfile.phoneNumber,
        role: mockAdminProfile.role,
        profilePictureUrl: mockAdminProfile.profilePictureUrl,
    });

    // --- Handlers (Logic Unchanged) ---
    const handleEditClick = () => {
        setIsEditing(true);
        const { lastLogin, ...editableFields } = profile;
        setEditedProfile(editableFields); 
    };

    const handleSaveClick = () => {
        setProfile(prev => ({ ...prev, ...editedProfile })); 
        setIsEditing(false);
        // Success notification here
        console.log('Saving profile:', editedProfile);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        const { lastLogin, ...editableFields } = profile;
        setEditedProfile(editableFields); 
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({ ...prev, [name]: value }));
    };

    // Component for a consistent info row display (for non-editing mode)
    // Uses flex and Stack for compact, professional display
    const InfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
        <Box display="flex" alignItems="flex-start">
            <Box sx={{ mr: 1.5, color: theme.palette.primary.main, minWidth: 24, pt: 0.5 }}>{icon}</Box>
            <Box>
                <Typography variant="caption" color="text.secondary" display="block" lineHeight={1.2}>{label}</Typography>
                <Typography variant="body1" fontWeight="medium" color="text.primary">{value}</Typography>
            </Box>
        </Box>
    );

    return (
        // Set height to fill view minus header/nav if they exist, or just 100vh
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f0f2f5', minHeight: 'calc(100vh - 68px)' }}> 
            
            {/* Page Header */}
            <Box sx={{ mb: 4, pb: 1, borderBottom: '2px solid', borderColor: theme.palette.grey[300] }}>
                <Typography variant="h4" fontWeight="700" color="primary.dark">
                    Admin Profile Setting
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Manage your identity and core contact information.
                </Typography>
            </Box>

            {/* Main Content Layout: Flex container for side-by-side columns (on md+) */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 3, // Reduced gap for density
                    alignItems: 'stretch', // KEY: Ensures columns stretch to max height
                }}
            >

                {/* LEFT COLUMN: Summary and Quick Stats (35% width) */}
                <Box sx={{ flex: { xs: '100%', md: '0 0 35%' }, minWidth: 250 }}>
                    <Paper 
                        elevation={6} // Higher elevation for visual hierarchy
                        sx={{ 
                            p: 4, 
                            borderRadius: 2, 
                            textAlign: 'center', 
                            height: '100%', // KEY: Ensures this card fills vertical space
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Avatar
                            alt={`${profile.firstName} ${profile.lastName}`}
                            src={profile.profilePictureUrl}
                            sx={{ width: 140, height: 140, mx: 'auto', mb: 2, border: '4px solid', borderColor: theme.palette.grey[200] }}
                        >
                            <PersonIcon sx={{ fontSize: 70 }} />
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
                            {profile.firstName} {profile.lastName}
                        </Typography>
                        
                        <Chip 
                            label={profile.role} 
                            color="secondary" 
                            sx={{ mb: 3, fontWeight: 'bold', px: 1, bgcolor: theme.palette.secondary.light + '22' }} 
                            icon={<BadgeIcon />} 
                        />
                        
                        <Divider sx={{ width: '100%', my: 2 }} />

                        {/* ID and Last Login (System Info) - Aligned Left within the centered card */}
                        <Stack spacing={1.5} alignItems="flex-start" sx={{ px: 1, width: '100%' }}>
                            <InfoRow icon={<KeyIcon />} label="System ID" value={profile.id} />
                            <InfoRow icon={<AccessTimeIcon />} label="Last Login" value={profile.lastLogin} />
                        </Stack>
                    </Paper>
                </Box>

                {/* RIGHT COLUMN: Editable Details and Actions (65% width) */}
                <Box sx={{ flex: { xs: '100%', md: '1 1 65%' } }}>
                    
                    <Stack spacing={3} sx={{ height: '100%' }}>
                        
                        {/* 1. PERSONAL DETAILS CARD */}
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, flexGrow: 1 }}> {/* flexGrow: 1 ensures it takes remaining space */}
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                <Typography variant="h6" fontWeight="bold" color="text.primary">
                                    Personal Contact Information
                                </Typography>
                                
                                {/* Action Buttons (Edit/Save/Cancel) */}
                                {!isEditing ? (
                                    <Button 
                                        variant="contained" 
                                        size="medium" 
                                        startIcon={<EditIcon />} 
                                        onClick={handleEditClick}
                                        color="primary"
                                    >
                                        Edit Information
                                    </Button>
                                ) : (
                                    <Stack direction="row" spacing={1}>
                                        <Button 
                                            variant="contained" 
                                            color="success" 
                                            size="medium" 
                                            startIcon={<SaveIcon />} 
                                            onClick={handleSaveClick}
                                        >
                                            Save Changes
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            color="error" 
                                            size="medium" 
                                            startIcon={<CancelIcon />} 
                                            onClick={handleCancelClick}
                                        >
                                            Cancel
                                        </Button>
                                    </Stack>
                                )}
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            {/* Fields Layout */}
                            <Box>
                                {isEditing ? (
                                    <Stack spacing={3}>
                                        {/* Name Fields */}
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                                            <TextField 
                                                fullWidth 
                                                label="First Name" 
                                                name="firstName" 
                                                value={editedProfile.firstName} 
                                                onChange={handleFieldChange} 
                                                InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon color="action" /></InputAdornment> }}
                                            />
                                            <TextField 
                                                fullWidth 
                                                label="Last Name" 
                                                name="lastName" 
                                                value={editedProfile.lastName} 
                                                onChange={handleFieldChange} 
                                                InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon color="action" /></InputAdornment> }}
                                            />
                                        </Stack>
                                        {/* Contact Fields */}
                                        <TextField 
                                            fullWidth 
                                            label="Email Address" 
                                            name="email" 
                                            type="email" 
                                            value={editedProfile.email} 
                                            onChange={handleFieldChange} 
                                            InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon color="action" /></InputAdornment> }}
                                        />
                                        <TextField 
                                            fullWidth 
                                            label="Phone Number" 
                                            name="phoneNumber" 
                                            value={editedProfile.phoneNumber} 
                                            onChange={handleFieldChange} 
                                            InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon color="action" /></InputAdornment> }}
                                        />
                                        {/* Read-Only Role Field */}
                                        <TextField 
                                            fullWidth 
                                            label="Access Role" 
                                            name="role" 
                                            value={editedProfile.role} 
                                            InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><BadgeIcon color="action" /></InputAdornment> }}
                                            variant="filled" 
                                            helperText="Role changes require Global Administrator approval."
                                        />
                                    </Stack>
                                ) : (
                                    <Stack spacing={3} direction="row" useFlexGap flexWrap="wrap" justifyContent="space-between">
                                        <Box sx={{ flex: '1 1 40%' }}><InfoRow icon={<PersonIcon />} label="First Name" value={profile.firstName} /></Box>
                                        <Box sx={{ flex: '1 1 40%' }}><InfoRow icon={<PersonIcon />} label="Last Name" value={profile.lastName} /></Box>
                                        <Divider sx={{ width: '100%', my: 0 }} />
                                        <Box sx={{ flex: '1 1 40%' }}><InfoRow icon={<EmailIcon />} label="Email Address" value={profile.email} /></Box>
                                        <Box sx={{ flex: '1 1 40%' }}><InfoRow icon={<PhoneIcon />} label="Phone Number" value={profile.phoneNumber} /></Box>
                                        <Divider sx={{ width: '100%', my: 0 }} />
                                        <Box sx={{ flex: '1 1 90%' }}><InfoRow icon={<BadgeIcon />} label="Access Role" value={profile.role} /></Box>
                                    </Stack>
                                )}
                            </Box>
                        </Paper>

                        {/* 2. ACTIONS CARD (Change Password) */}
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                            <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                                Account Security
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                startIcon={<KeyIcon />} 
                                sx={{ width: { xs: '100%', sm: 'auto' } }}
                                onClick={() => alert('Initiating Change Password flow...')}
                            >
                                Change Password
                            </Button>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                                Use a strong, unique password to secure your account.
                            </Typography>
                        </Paper>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}