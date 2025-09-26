import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import the thunk action, not the slice reducer
import { fetchSales } from '../salesSlice';
import {
  Box,
} from '@mui/material';

import Sidebar from '../components/Sidebar';
import mockData from '../../../utils/mockdata.json';
import { AppDispatch, RootState } from '../../../redux/types';
import { SaleItem } from '../types';
import SalesTable from '../components/SalesTable';


const InventoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((s: RootState) => s.inventory.items) || [];
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  const list = items.length ? items : mockData;
  type ItemType = typeof mockData[0] | SaleItem;
  const [rows, setRows] = useState<ItemType[]>(list);

  useEffect(() => {
    setRows(list);
  }, [list]);

  const filtered = rows.filter((it) => it.name.toLowerCase().includes(query.toLowerCase()) || (it.sku || '').toLowerCase().includes(query.toLowerCase()));
  const handleDelete = (id: string | number) => {
    if (window.confirm('Delete this product?')) {
      setRows((r) => r.filter((x) => x.id !== id));
    }
  };

  return (
    <Box display="flex" sx={{ width: "100%", overflow: "hidden" }}>
      <Sidebar />
      <Box sx={{width:"100%", p:2}}>
        <SalesTable filtered={filtered} handleDelete={handleDelete} query={query} setQuery={setQuery} />
      </Box>
    </Box>
  );
};

export default InventoryPage;