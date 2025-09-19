import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatCurrency } from '../../../utils'

const InventoryTable = ({filtered, handleDelete}) => {
    return (
        <Paper sx={{ width: "100%", }}>
            <TableContainer sx={{ overflowX: "scroll", height: "calc(100vh - 230px)", overflow: "scroll" }}>
                <Table size="medium" stickyHeader aria-label="customized table">
                    <TableHead >
                        <TableRow sx={{ '& th': { py: 1, fontSize: '1.0rem', backgroundColor: "#bdbdbd", color: 'text.dark', fontWeight: "bold", textWrap: "nowrap" } }}>
                            <TableCell sx={{ py: 1, }}>Id</TableCell>
                            <TableCell sx={{ py: 1, }}>Product</TableCell>
                            <TableCell sx={{ py: 1, }}>Quantity</TableCell>
                            <TableCell sx={{ py: 1, }}>Brand</TableCell>
                            <TableCell sx={{ py: 1, }}>Category</TableCell>
                            <TableCell sx={{ py: 1, }}>Vendor</TableCell>
                            <TableCell sx={{ py: 1, }}>Compatibility</TableCell>
                            <TableCell sx={{ py: 1, }}>More Details</TableCell>
                            <TableCell sx={{ py: 1, }}>Purchase Price</TableCell>
                            <TableCell sx={{ py: 1, }}>Selling Price</TableCell>
                            <TableCell sx={{ py: 1, }}>Location</TableCell>
                            <TableCell sx={{ py: 1, }}>Actions</TableCell>
                            <TableCell sx={{ py: 1, }}>Added Date</TableCell>
                            <TableCell sx={{ py: 1, }}>Updated Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ '& td': { py: 0.75, fontSize: '0.8rem' } }}>
                        {filtered.map((it) => (
                            <TableRow key={it.i_id}>
                                <TableCell>{it.i_id}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box sx={{ width: 32, height: 32, bgcolor: 'grey.200', borderRadius: 1 }} />
                                        <Box sx={{ fontSize: "0.8rem" }}>
                                            <Typography>{it.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">#{it.id || it.sku}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>{it.quantity}</TableCell>
                                <TableCell>{it.brand}</TableCell>
                                <TableCell>{it.category}</TableCell>
                                <TableCell>{it.vendor}</TableCell>
                                <TableCell>{it.compatibility}</TableCell>
                                <TableCell><Button>View More</Button></TableCell>
                                <TableCell>{formatCurrency(it.purchase_price)}</TableCell>
                                <TableCell>{formatCurrency(it.selling_price)}</TableCell>
                                <TableCell>{it.location}</TableCell>
                                <TableCell >
                                    <Box sx={{ display: "flex" }}>
                                        {/* <Tooltip title="View details">
                        <IconButton size="small" aria-label={`view-${it.id}`}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip> */}
                                        <Tooltip title="Edit product">
                                            <IconButton size="small" aria-label={`edit-${it.id}`}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete product">
                                            <IconButton size="small" aria-label={`delete-${it.id}`} onClick={() => handleDelete(it.id)}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                                <TableCell>{it.add_date}</TableCell>
                                <TableCell>{it.update_date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default InventoryTable