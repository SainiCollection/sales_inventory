import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchSales } from '../salesSlice';
import { Container, Typography, Paper } from '@mui/material';

const SalesPage = () => {
  const dispatch = useAppDispatch();
  const records = useAppSelector((s) => s.sales.records);

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
