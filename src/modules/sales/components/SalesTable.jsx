import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { formatCurrency } from '../../../utils'

const SalesTable = ({ filtered, handleDelete }) => {
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
                            <TableCell sx={{ py: 1, }}>Compatibility</TableCell>
                            <TableCell sx={{ py: 1, }}>More Details</TableCell>
                            <TableCell sx={{ py: 1, }}>Selling Price</TableCell>
                            <TableCell sx={{ py: 1, }}>Location</TableCell>
                            <TableCell sx={{ py: 1, }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ '& td': { py: 0.75, fontSize: '0.8rem' } }}>
                        {filtered.map((it) => (
                            <TableRow key={it.i_id}>
                                <TableCell>{it.i_id}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box component="img" src={it.sku} alt='Product' sx={{ width: 32, height: 32, bgcolor: 'grey.200', borderRadius: 1 }} />
                                        <Box sx={{ fontSize: "0.8rem" }}>
                                            <Typography>{it.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">#{it.id || it.sku}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>{it.quantity}</TableCell>
                                <TableCell>{it.brand}</TableCell>
                                <TableCell>{it.category}</TableCell>
                                <TableCell>{it.compatibility}</TableCell>
                                <TableCell><Button>View More</Button></TableCell>
                                <TableCell>{formatCurrency(it.selling_price)}</TableCell>
                                <TableCell>{it.location}</TableCell>
                                <TableCell >
                                    <Box sx={{ display: "flex", gap:1 }}>
                                        <Tooltip title="Sell Now">
                                            <Button sx={{fontSize:".6vw"}} color='primary' variant='outlined' aria-label={`edit-${it.id}`}>
                                                Sell Now
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Add tTo Cart">
                                            <Button sx={{fontSize:".6vw"}} color='success' variant='contained' aria-label={`delete-${it.id}`} >
                                                Add To Cart
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default SalesTable