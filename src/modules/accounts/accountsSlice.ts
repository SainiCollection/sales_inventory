import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as accountsAPI from './services/accountsAPI';
import type { AccountsState } from './types';

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
  const res = await accountsAPI.fetchAccounts();
  return res.data;
});

const initialState: AccountsState = { users: [], status: 'idle', error: null };

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default accountsSlice.reducer;
