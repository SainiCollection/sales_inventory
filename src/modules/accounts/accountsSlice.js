import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as accountsAPI from './services/accountsAPI';

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
  const res = await accountsAPI.fetchAccounts();
  return res.data;
});

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: { users: [], status: 'idle', error: null },
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
