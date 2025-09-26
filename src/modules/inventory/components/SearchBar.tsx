
import { Box, InputAdornment, Paper, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

const SearchBar = ({ query, setQuery }) => {
    return (
        <Paper sx={{ width: "100%" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">

                <TextField
                    size="small"
                    placeholder="Search Products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{ width: "100%" }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                />

            </Box>
        </Paper>
    )
}

export default SearchBar
