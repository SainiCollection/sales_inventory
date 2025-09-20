import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../inventorySlice';
import {
  Box,
} from '@mui/material';

import Sidebar from '../../../components/compound/Sidebar';
import mockData from '../mockdata.json';
import InventoryHeader from '../components/InventoryHeader';
import SearchBar from '../components/SearchBar';
import InventoryTable from '../components/InventoryTable';
import InventoryFilters from '../components/InventoryFilters';

const InventoryPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.inventory.items) || [];
  const [query, setQuery] = useState('');

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
    <Box display="flex" sx={{ width: "100%" }}>
      <Sidebar />
      <Box component="main" sx={{ p: 2, width: "87%", overflow: "hidden" }}>
        <InventoryHeader />
        <Box sx={{ width: "100%" }}>
         
          <SearchBar query={query} setQuery={setQuery}/>
          <InventoryFilters/>
          <InventoryTable filtered={filtered} handleDelete={handleDelete}/>
        </Box>
      </Box>
    </Box>
  );
};

export default InventoryPage;
