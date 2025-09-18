import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as salesAPI from './services/salesAPI';

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  const res = await salesAPI.fetchSales();
  return res.data;
});

const salesSlice = createSlice({
  name: 'sales',
  initialState: { records: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.records = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default salesSlice.reducer;
