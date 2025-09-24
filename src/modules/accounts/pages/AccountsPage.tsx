import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAccounts } from '../accountsSlice';
import { Container, Typography, Paper } from '@mui/material';

const AccountsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((s) => s.accounts.users);

  useEffect(() => {
    // fetchAccounts may be an async thunk; cast to any for now until typed thunks are added
    dispatch(fetchAccounts() as any);
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

// cleaned duplicate exports above

export default AccountsPage;
