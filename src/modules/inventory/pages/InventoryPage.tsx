import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchItems } from '../inventorySlice';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Paper,
  Pagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import { formatCurrency } from '../../../utils';
import mockData from '../mockdata.json';


type StatCardProps = {
  title: string;
  value: React.ReactNode;
  caption?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, caption }) => (
  <Card variant="outlined" sx={{ minWidth: 180 }}>
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h5">{value}</Typography>
      {caption && <Typography variant="caption">{caption}</Typography>}
    </CardContent>
  </Card>
);

const InventoryPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.inventory.items) || [];
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const list = items.length ? items : mockData;
  const [rows, setRows] = useState(list);

  useEffect(() => {
    setRows(list);
  }, [list]);

  const filtered = rows.filter((it) => it.name.toLowerCase().includes(query.toLowerCase()) || (it.sku || '').toLowerCase().includes(query.toLowerCase()));

  const handleDelete = (id) => {
    // simple local confirmation and removal for demo
    // in a real app dispatch delete action to the API
    // eslint-disable-next-line no-alert
    if (window.confirm('Delete this product?')) {
      setRows((r) => r.filter((x) => x.id !== id));
    }
  };

  return (
    <Box display="flex">
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" gutterBottom>
            Inventory Management
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <StatCard title="Total Products" value={1248} />
            <StatCard title="Low Stock" value={24} />
            <StatCard title="Sales Today" value="$2,450" />
            <StatCard title="Pending Orders" value={12} />
          </Box>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <TextField size="small" placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} sx={{ width: 300 }} />
              <Button variant="contained" startIcon={<AddIcon />}>Add New Product</Button>
            </Box>
          </Paper>

          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { py: 1, fontSize: '0.75rem', color: 'text.secondary' } }}>
                  <TableCell sx={{ py: 1, fontSize: '0.75rem' }}>Product</TableCell>
                  <TableCell sx={{ py: 1, fontSize: '0.75rem' }}>Quantity</TableCell>
                  <TableCell sx={{ py: 1, fontSize: '0.75rem' }}>Brand</TableCell>
                  <TableCell sx={{ py: 1, fontSize: '0.75rem' }}>Category</TableCell>
                  <TableCell sx={{ py: 1, fontSize: '0.75rem' }}>Compatibility</TableCell>
                  <TableCell sx={{ py: 1, fontSize: '0.75rem' }}>Labels</TableCell>
                  <TableCell sx={{ py: 1, fontSize: '0.75rem' }}>Price</TableCell>
                  <TableCell sx={{ py: 1, fontSize: '0.75rem' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ '& td': { py: 0.75, fontSize: '0.8rem' } }}>
                {filtered.map((it) => (
                  <TableRow key={it.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box sx={{ width: 32, height: 32, bgcolor: 'grey.200', borderRadius: 1 }} />
                        <Box>
                          <Typography>{it.name}</Typography>
                          <Typography variant="caption" color="text.secondary">#{it.id || it.sku}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{it.quantity}</TableCell>
                    <TableCell>{it.brand}</TableCell>
                    <TableCell>{it.category}</TableCell>
                    <TableCell>{it.compatibility}</TableCell>
                    <TableCell>
                      <Chip label={it.label} color={it.label === 'Low Stock' ? 'warning' : 'success'} />
                    </TableCell>
                    <TableCell>{formatCurrency(it.price)}</TableCell>
                    <TableCell>
                      <Tooltip title="View details">
                        <IconButton size="small" aria-label={`view-${it.id}`}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
              <Typography variant="caption">Showing 1 to {filtered.length} of {list.length} results</Typography>
              <Pagination count={Math.max(1, Math.ceil(filtered.length / 10))} page={page} onChange={(e, v) => setPage(v)} />
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default InventoryPage;
