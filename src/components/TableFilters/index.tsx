import * as React from 'react';
import { Box, Button, Grid, MenuItem, TextField } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';

declare module '@mui/system' {
    interface BreakpointOverrides {
        laptop: true;
        tablet: true;
        mobile: true;
        desktop: true;
        xs: false;
        sm: false;
        md: false;
        lg: false;
        xl: false;
    }
}

const TableFilters: React.FC = () => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1,px:2 }}>
            <Grid container spacing={2}>
                {/* Category */}
                <Grid sx={{ width: "100%" }}>
                    <TextField
                        select
                        fullWidth
                        label="Category"
                        size="small"
                        sx={{ width: '100%' }}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="engine">Engine</MenuItem>
                        <MenuItem value="brakes">Brakes</MenuItem>
                        <MenuItem value="electrical">Electrical</MenuItem>
                    </TextField>
                </Grid>

                {/* Brand */}
                <Grid sx={{ width: "100%" }}>
                    <TextField
                        select
                        fullWidth
                        label="Brand"
                        size="small"
                        sx={{ width: '100%' }}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="bosch">Bosch</MenuItem>
                        <MenuItem value="sony">Sony</MenuItem>
                        <MenuItem value="samsung">Samsung</MenuItem>
                    </TextField>
                </Grid>

                {/* Vendor */}
                <Grid sx={{ width: "100%" }}>
                    <TextField
                        select
                        fullWidth
                        label="Vendor"
                        size="small"
                        sx={{ width: '100%' }}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="vendor1">Vendor 1</MenuItem>
                        <MenuItem value="vendor2">Vendor 2</MenuItem>
                    </TextField>
                </Grid>

                {/* Added Date */}
                <Grid sx={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Added Date"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                {/* Updated Date */}
                <Grid sx={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Updated Date"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                {/* Price Range */}
                <Grid sx={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Min Price"
                        type="number"
                        size="small"
                    />
                </Grid>
                <Grid sx={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Max Price"
                        type="number"
                        size="small"
                    />
                </Grid>

                {/* Actions */}
                <Grid sx={{ width: "100%" }}>
                    <Box display="flex" gap={1} alignItems="center">
                        <Button variant="contained" color="primary" fullWidth>
                            Apply
                        </Button>
                        <Button variant="outlined" color="secondary" fullWidth>
                            Reset
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TableFilters;