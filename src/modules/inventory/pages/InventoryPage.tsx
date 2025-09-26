import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../inventorySlice';
import {
  Box,
} from '@mui/material';

import Sidebar from '../components/Sidebar';
import mockData from '../../../utils/mockdata.json';
import InventoryTable from '../components/InventoryTable';
import { AppDispatch, RootState } from '../../../redux/types';
import { InventoryItem } from '../types';


const InventoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((s: RootState) => s.inventory.items) || [];
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const list = items.length ? items : mockData;
  type ItemType = typeof mockData[0] | InventoryItem;
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
        <InventoryTable filtered={filtered} handleDelete={handleDelete} query={query} setQuery={setQuery} />
      </Box>
    </Box>
  );
};

export default InventoryPage;