import * as React from "react";
import {
    Badge,
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatCurrency } from "../../../utils";
import SearchBar from "./SearchBar";

const EngineBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        fontSize: "0.55rem",       // small text
        fontWeight: 600,
        padding: "2px 6px",
        borderRadius: "8px",
        height: "fit-content",
        lineHeight: 1.2,
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
        fontWeight: "bold",
        fontSize: "0.85rem",
        whiteSpace: "nowrap",
        padding: "4px 8px", // Dense padding
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: "0.75rem",
        padding: "4px 8px", // Dense padding
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const InventoryTable = ({ filtered, handleDelete, query, setQuery }: { filtered: any[]; handleDelete: (id: string | number) => void; query: string; setQuery: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <Card sx={{ maxWidth: "100%" }}>
            <CardHeader
                title={
                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
                        <Box sx={{ width: "100%" }}>
                            <SearchBar query={query} setQuery={setQuery} />
                        </Box>
                    </Box>

                }
            />
            <CardContent sx={{ pt: 0 }}>
                <Paper sx={{ width: "100%" }}>
                    <TableContainer sx={{ maxHeight: "calc(100vh - 190px)" }}>
                        <Table stickyHeader size="small" aria-label="dense table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Product</StyledTableCell>
                                    <StyledTableCell>Quantity</StyledTableCell>
                                    <StyledTableCell>Category</StyledTableCell>
                                    <StyledTableCell>Compatibility</StyledTableCell>
                                    <StyledTableCell>Brand</StyledTableCell>
                                    <StyledTableCell>Vendor</StyledTableCell>
                                    <StyledTableCell>Purchase Price</StyledTableCell>
                                    <StyledTableCell>Selling Price</StyledTableCell>
                                    <StyledTableCell>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filtered.map((it) => (
                                    <StyledTableRow key={it.id}>
                                        <StyledTableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Box
                                                    component="img"
                                                    src={it.sku}
                                                    alt="Product"
                                                    sx={{ width: 50, height: 40, bgcolor: "grey.200", borderRadius: 1 }}
                                                />
                                                <Box sx={{ fontSize: "0.75rem" }}>
                                                    <Typography>{it.name}</Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        #{it.id || it.sku}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell>{it.quantity}</StyledTableCell>
                                        <StyledTableCell>
                                            {it.category === "Engine" ? (
                                                <EngineBadge
                                                    anchorOrigin={{
                                                        vertical: "top",
                                                        horizontal: "right",
                                                    }}
                                                    sx={{
                                                        "& .MuiBadge-badge": {
                                                            top: 0,     // shift down (positive values move down)
                                                            right: -20, // shift left/right
                                                            backgroundColor:
                                                                it.engine_type?.length === 2
                                                                    ? "purple" // both
                                                                    : it.engine_type?.[0] === "Petrol"
                                                                        ? "green"
                                                                        : "blue", // diesel
                                                            color: "white",
                                                        },
                                                    }}
                                                    badgeContent={
                                                        it.engine_type?.length === 2
                                                            ? "P & D"
                                                            : it.engine_type?.[0] || ""
                                                    }
                                                >
                                                    <Typography>{it.category}</Typography>
                                                </EngineBadge>
                                            ) : (
                                                <Typography>{it.category}</Typography>
                                            )}
                                        </StyledTableCell>

                                        <StyledTableCell>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 0.5,
                                                    alignItems: "center",
                                                    flexWrap: "wrap",
                                                    width: "100%"
                                                }}
                                            >
                                                {it.compatibility?.map((item, index) => (
                                                    <Chip key={index} label={item} color="info" size="small" sx={{ borderRadius: 2 }} />
                                                ))}
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell>{it.brand}</StyledTableCell>
                                        <StyledTableCell>{it.vendor}</StyledTableCell>
                                        <StyledTableCell>{formatCurrency(it.purchase_price)}</StyledTableCell>
                                        <StyledTableCell>
                                            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                                                <Chip
                                                    label={formatCurrency(it.selling_price)}
                                                    color="primary"
                                                    size="small"
                                                    sx={{ borderRadius: 2 }}
                                                />
                                                <Chip
                                                    label={formatCurrency(it.vendor_price)}
                                                    color="secondary"
                                                    size="small"
                                                    sx={{ borderRadius: 2 }}
                                                />
                                            </Box>
                                        </StyledTableCell>

                                        <StyledTableCell>
                                            <Box sx={{ display: "flex", gap: 0.5 }}>
                                                <Tooltip title="View More Details">
                                                    <IconButton component={RouterLink} to={'/productDetails'} size="small">
                                                        <VisibilityIcon fontSize="small" color="success" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit product">
                                                    <IconButton size="small">
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete product">
                                                    <IconButton size="small" onClick={() => handleDelete(it.id)}>
                                                        <DeleteIcon fontSize="small" color="error" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </CardContent>
        </Card>

    );
};

export default InventoryTable;
