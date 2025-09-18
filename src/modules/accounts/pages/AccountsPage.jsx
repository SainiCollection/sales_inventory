import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from '../accountsSlice';
import { Container, Typography, Paper } from '@mui/material';

const AccountsPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.accounts.users);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Accounts
      </Typography>
      <Paper style={{ padding: 16 }}>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </Paper>
    </Container>
  );
};

export default AccountsPage;
