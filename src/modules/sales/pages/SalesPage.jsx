import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSales } from '../salesSlice';
import { Container, Typography, Paper } from '@mui/material';

const SalesPage = () => {
  const dispatch = useDispatch();
  const records = useSelector((s) => s.sales.records);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sales
      </Typography>
      <Paper style={{ padding: 16 }}>
        <pre>{JSON.stringify(records, null, 2)}</pre>
      </Paper>
    </Container>
  );
};

export default SalesPage;
