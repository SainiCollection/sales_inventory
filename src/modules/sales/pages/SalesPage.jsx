import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSales } from '../salesSlice';
import {  Typography, Paper, Box } from '@mui/material';
import Sidebar from '../../../components/compound/Sidebar';

const SalesPage = () => {
  const dispatch = useDispatch();
  const records = useSelector((s) => s.sales.records);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <Box display={'flex'}>
      <Sidebar/>
      <Box sx={{ p: 2, width: "87%", overflow: "hidden" }}>
        <Typography variant="h4" gutterBottom>
          Sales
        </Typography>
        <Paper style={{ padding: 16 }}>
          <pre>{JSON.stringify(records, null, 2)}</pre>
        </Paper>
      </Box>
    </Box>

  );
};

export default SalesPage;
