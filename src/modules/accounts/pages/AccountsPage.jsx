import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from '../accountsSlice';
import { Container, Typography, Paper, Box } from '@mui/material';
import Sidebar from '../../../components/compound/Sidebar';

const AccountsPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.accounts.users);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <Box display="flex">
      <Sidebar />

      <Container>
        <Typography variant="h4" gutterBottom>
          Accounts
        </Typography>
        <Paper sx={{ p: 2 }}>
          <pre>{JSON.stringify(users, null, 2)}</pre>
        </Paper>
      </Container>
    </Box>

  );
};

export default AccountsPage;
