import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Paper, 
    Divider, 
    Button,
    Stack, 
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Snackbar,
    Alert,
    InputAdornment,
    Tooltip, 
    Switch, // <-- IMPORTED: Toggle Switch
    useTheme // <-- IMPORTED: For professional color use
} from '@mui/material';

// --- Icons ---
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyIcon from '@mui/icons-material/Key';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CancelIcon from '@mui/icons-material/Cancel';

// --- Interfaces and Mock Data (Unchanged) ---
type UserRole = 'Admin' | 'Manager' | 'Shop Keeper';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: UserRole;
    status: 'Active' | 'Inactive';
    lastLogin: string;
}

const mockRoles: UserRole[] = ['Admin', 'Manager', 'Shop Keeper'];

const mockUsers: User[] = [
    { id: 101, firstName: 'Alex', lastName: 'Johnson', email: 'alex@shop.com', phone: '123-456-7890', role: 'Admin', status: 'Active', lastLogin: '2025-09-27 10:30 AM' },
    { id: 102, firstName: 'Sarah', lastName: 'Priya', email: 'sarah@shop.com', phone: '987-654-3210', role: 'Manager', status: 'Active', lastLogin: '2025-09-26 03:15 PM' },
    { id: 103, firstName: 'Ravi', lastName: 'Patel', email: 'ravi@shop.com', phone: '555-123-4567', role: 'Shop Keeper', status: 'Active', lastLogin: '2025-09-27 08:00 AM' },
    { id: 104, firstName: 'Neha', lastName: 'Gupta', email: 'neha@shop.com', phone: '222-333-4444', role: 'Shop Keeper', status: 'Inactive', lastLogin: '2025-09-20 11:45 AM' },
];

// --- User Management Component ---
export default function ManagementPage() {
    const theme = useTheme();
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState<Partial<User> & { password?: string }>({});
    const [filterText, setFilterText] = useState('');

    const emptyUser: Partial<User> & { password?: string } = { 
        id: 0, 
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '', 
        password: '',
        role: mockRoles[0], 
        status: 'Active' 
    };

    // --- Handlers (Logic remains the same) ---
    const handleOpenModal = (user?: User) => {
        setIsEditing(true);
        setCurrentUser(user ? { ...user, password: '' } : emptyUser);
    };

    const handleCloseModal = () => {
        setIsEditing(false);
        setCurrentUser({});
    };

    const handleSaveUser = () => {
        if (!currentUser.firstName || !currentUser.lastName || !currentUser.email || !currentUser.role) {
            setSnackbarMessage('Please fill in all required user fields.');
            setOpenSnackbar(true);
            return;
        }
        
        if (!currentUser.id && !currentUser.password) {
            setSnackbarMessage('Password is required for new user creation.');
            setOpenSnackbar(true);
            return;
        }

        const userPayload = { ...currentUser };
        delete userPayload.password; 

        if (currentUser.id) {
            setUsers(users.map(u => (u.id === currentUser.id ? { ...u, ...userPayload } as User : u)));
            setSnackbarMessage(`User ${currentUser.firstName} ${currentUser.lastName} updated successfully.`);
        } else {
            const newUser: User = { 
                ...userPayload, 
                id: Math.max(...users.map(u => u.id), 0) + 1,
                lastLogin: 'Never', 
            } as User;
            setUsers([...users, newUser]);
            setSnackbarMessage(`User ${newUser.firstName} created successfully.`);
        }

        handleCloseModal();
        setOpenSnackbar(true);
    };

    const handleDeleteUser = (id: number) => {
        const userToDelete = users.find(u => u.id === id);
        if (window.confirm(`Are you sure you want to delete user ${userToDelete?.firstName} ${userToDelete?.lastName}? This action cannot be undone.`)) {
            setUsers(users.filter(u => u.id !== id));
            setSnackbarMessage(`User ${userToDelete?.firstName} deleted.`);
            setOpenSnackbar(true);
        }
    };

    // Updated handler to use the toggle state
    const handleToggleStatus = (user: User, event: React.ChangeEvent<HTMLInputElement>) => {
        const newStatus: 'Active' | 'Inactive' = event.target.checked ? 'Active' : 'Inactive';
        setUsers(users.map(u => 
            u.id === user.id ? { ...u, status: newStatus } : u
        ));
        setSnackbarMessage(`${user.firstName}'s status set to ${newStatus}.`);
        setOpenSnackbar(true);
    };
    
    // Filtered list based on search term
    const filteredUsers = users.filter(user => 
        (user.firstName + ' ' + user.lastName).toLowerCase().includes(filterText.toLowerCase()) ||
        user.email.toLowerCase().includes(filterText.toLowerCase()) ||
        user.role.toLowerCase().includes(filterText.toLowerCase())
    );

    // --- Helper function for Role Chip Color ---
    const getRoleChipColor = (role: UserRole) => {
        switch (role) {
            case 'Admin': return 'error';
            case 'Manager': return 'warning';
            case 'Shop Keeper': return 'primary';
            default: return 'default';
        }
    };
    
    // --- User Form Modal (Slightly improved styling) ---
    const UserForm = (
        <Paper elevation={15} sx={{ 
            p: 4, 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: { xs: '90%', sm: 600 }, 
            zIndex: 10, 
            bgcolor: 'background.paper', 
            borderRadius: 3 
        }}>
            <Typography variant="h5" fontWeight="bold" mb={3} color="primary.dark">
                {currentUser.id ? 'Edit Staff Account' : 'Register New Staff'}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Stack spacing={3}>
                {/* Name, Email, Phone, Role, Password Fields... (remains structurally the same) */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <TextField label="First Name" value={currentUser.firstName || ''} onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })} required fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment> }} size="small" />
                    <TextField label="Last Name" value={currentUser.lastName || ''} onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })} required fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment> }} size="small" />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <TextField label="Email Address" type="email" value={currentUser.email || ''} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} required fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment> }} size="small" />
                    <TextField label="Phone Number" value={currentUser.phone || ''} onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })} required fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon fontSize="small" /></InputAdornment> }} size="small" />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <FormControl fullWidth required size="small">
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            label="Role"
                            value={currentUser.role || mockRoles[0]}
                            onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value as UserRole })}
                        >
                            {mockRoles.map(role => (
                                <MenuItem key={role} value={role}>{role}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label={currentUser.id ? 'New Password (Optional)' : 'Password'}
                        type="password"
                        value={currentUser.password || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                        required={!currentUser.id}
                        fullWidth
                        InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment> }}
                        helperText={currentUser.id ? "Leave blank to keep current password." : "Required for new users."}
                        size="small"
                    />
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="flex-end" pt={1}>
                    <Button variant="outlined" onClick={handleCloseModal} startIcon={<CancelIcon />}>
                        Cancel
                    </Button>
                    <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveUser} color="success">
                        {currentUser.id ? 'Save Changes' : 'Create User'}
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f0f2f5', minHeight: 'calc(100vh - 70px)', position: 'relative' }}>
            
            {/* Modal Overlay and Form */}
            {isEditing && (
                <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0, 0, 0, 0.6)', zIndex: 9, backdropFilter: 'blur(3px)' }}/>
            )}
            {isEditing && UserForm}

            {/* Page Header (More professional) */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="700" color="primary.dark">
                    Staff Management
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Centralized access and permission control for all users.
                </Typography>
            </Box>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                
                {/* Controls and Search */}
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={2} mb={3}>
                    <TextField
                        size="small"
                        placeholder="Search users by name, email, or role..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ width: { xs: '100%', sm: 400 } }}
                    />

                    <Tooltip title="Register a new staff account" arrow>
                        <Button 
                            variant="contained" 
                            startIcon={<PersonAddIcon />} 
                            onClick={() => handleOpenModal()}
                            size="medium"
                            color="success"
                        >
                            Add New User
                        </Button>
                    </Tooltip>
                </Stack>

                {/* Users Table */}
                <TableContainer>
                    <Table size="small" aria-label="staff management table"> {/* KEY: size="small" for density */}
                        <TableHead>
                            <TableRow sx={{ 
                                bgcolor: theme.palette.primary.light + '1A', // Light primary background
                                '& th': { fontWeight: 'bold', color: theme.palette.primary.dark } // Darker text
                            }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Last Login</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} hover>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="body2" fontWeight="medium">{user.firstName} {user.lastName}</Typography>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>
                                        <Chip label={user.role} size="small" color={getRoleChipColor(user.role)} variant="outlined" />
                                    </TableCell>
                                    
                                    {/* KEY CHANGE: Toggle Switch for Status */}
                                    <TableCell sx={{ minWidth: 100 }}>
                                        <Tooltip title={user.status === 'Active' ? 'Deactivate user' : 'Activate user'} arrow>
                                            <Switch 
                                                checked={user.status === 'Active'}
                                                onChange={(e) => handleToggleStatus(user, e)}
                                                color="success"
                                                inputProps={{ 'aria-label': `Toggle status for ${user.firstName}` }}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    
                                    <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>{user.lastLogin}</TableCell>
                                    
                                    {/* Actions (Consolidated/Simplified) */}
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={0} justifyContent="flex-end">
                                            <Tooltip title="Edit Details" arrow>
                                                <IconButton size="small" color="primary" onClick={() => handleOpenModal(user)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            
                                            <Tooltip title="Reset Password" arrow>
                                                <IconButton size="small" sx={{ color: theme.palette.warning.dark }} onClick={() => alert(`Initiate password reset for ${user.firstName}`)}>
                                                    <KeyIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            
                                            <Tooltip title="Delete Account" arrow>
                                                <IconButton size="small" color="error" onClick={() => handleDeleteUser(user.id)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {filteredUsers.length === 0 && (
                    <Box sx={{ p: 3, textAlign: 'center', borderTop: `1px solid ${theme.palette.grey[200]}` }}>
                        <Typography color="text.secondary">No users found matching your criteria.</Typography>
                    </Box>
                )}
            </Paper>

            {/* Snackbar for Notifications */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}