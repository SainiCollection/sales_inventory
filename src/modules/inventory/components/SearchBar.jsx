import { Box, Paper, TextField } from '@mui/material'
import React from 'react'

const SearchBar = ({query, setQuery}) => {
    return (
        <Paper sx={{ p: 0, mb: 2, width: "100%" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <TextField size="small" placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} sx={{ width: "100%" }} />
            </Box>
        </Paper>
    )
}

export default SearchBar