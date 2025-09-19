import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';
import { Box, Button, Grid, MenuItem, TextField } from '@mui/material';

const AccordionUsage = () => {
    return (
        <Box sx={{ mb: 2 }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<FilterListAltIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Filters...</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {/* Search by name/ID */}
                        {/* <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="Search Product"
                                placeholder="Name / ID / SKU"
                                variant="outlined"
                                size="small"
                            />
                        </Grid> */}

                        {/* Category */}
                        <Grid item  sx={{width:"10%"}}>
                            <TextField
                                select
                                fullWidth
                                label="Category"
                                variant="outlined"
                                size="small"
                                sx={{width:"100%"}}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="engine">Engine</MenuItem>
                                <MenuItem value="brakes">Brakes</MenuItem>
                                <MenuItem value="electrical">Electrical</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Brand */}
                        <Grid item  sx={{width:"10%"}}>
                            <TextField
                                select
                                fullWidth
                                label="Brand"
                                variant="outlined"
                                size="small"
                                sx={{width:"100%"}}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="bosch">Bosch</MenuItem>
                                <MenuItem value="sony">Sony</MenuItem>
                                <MenuItem value="samsung">Samsung</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Vendor */}
                        <Grid item  sx={{width:"10%"}}>
                            <TextField
                                select
                                fullWidth
                                label="Vendor"
                                variant="outlined"
                                size="small"
                                sx={{width:"100%"}}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="vendor1">Vendor 1</MenuItem>
                                <MenuItem value="vendor2">Vendor 2</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Date Added */}
                        <Grid item  sx={{width:"12%"}}>
                            <TextField
                                fullWidth
                                label="Added Date"
                                type="date"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                sx={{width:"100%"}}
                            />
                        </Grid>

                         {/* Updated Added */}
                        <Grid item  sx={{width:"12%"}}>
                            <TextField
                                fullWidth
                                label="Updated Date"
                                type="date"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                sx={{width:"100%"}}
                            />
                        </Grid>

                        {/* Price Range */}
                        <Grid item  sx={{width:"10%"}}>
                            <TextField
                                fullWidth
                                label="Min Price"
                                type="number"
                                size="small"
                                variant="outlined"
                                sx={{width:"100%"}}
                            />
                        </Grid>
                        <Grid item  sx={{width:"10%"}}>
                            <TextField
                                fullWidth
                                label="Max Price"
                                type="number"
                                size="small"
                                variant="outlined"
                                sx={{width:"100%"}}
                            />
                        </Grid>

                        {/* Actions */}
                        <Grid item xs={12} md={3}>
                            <Box display="flex" gap={1} height="100%" alignItems="center">
                                <Button variant="contained" color="primary" fullWidth>
                                    Apply
                                </Button>
                                <Button variant="outlined" color="secondary" fullWidth>
                                    Reset
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default AccordionUsage;
