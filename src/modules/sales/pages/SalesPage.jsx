import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../../components/compound/Sidebar';
import mockData from '../../../utils/mockdata.json';
import { fetchItems } from '../../inventory/inventorySlice';
import SearchBar from '../components/SearchBar';
import SalesFilters from '../components/SalesFilters';
import SalesTable from '../components/SalesTable';
import SalesHeader from '../components/SalesHeader'
import { Box } from '@mui/material';

const SalesPage = () => {
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
  

  return (
   <Box display="flex" sx={{ width: "100%" }}>
      <Sidebar />
      <Box component="main" sx={{ p: 2, width: "87%", overflow: "hidden" }}>
        <Box sx={{ width: "100%" }}>
         <SalesHeader/>
          <SearchBar query={query} setQuery={setQuery}/>
          <SalesFilters/>
          <SalesTable filtered={filtered} />
        </Box>
      </Box>
    </Box>

  );
};

export default SalesPage;
