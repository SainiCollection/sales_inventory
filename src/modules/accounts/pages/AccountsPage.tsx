import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchAccounts } from '../accountsSlice';
import { Box } from '@mui/material';

const AccountsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // fetchAccounts may be an async thunk; cast to any for now until typed thunks are added
    dispatch(fetchAccounts() as any);
  }, [dispatch]);

  return (
    <Box display="flex" sx={{ width: "100%",p:2, overflow: "hidden" }}>
      Accounts page is not ready yet...
    </Box>
  );
};

// cleaned duplicate exports above

export default AccountsPage;
