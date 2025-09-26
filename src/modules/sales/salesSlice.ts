import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as salesAPI from './services/salesAPI';
import type { SalesState, SaleItem } from './types';

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  const res = await salesAPI.fetchSales();
  return res.data as SaleItem[];
});

const initialState: SalesState = { records: [], status: 'idle', error: null };

const salesSlice = createSlice({
  name: 'sales',
  initialState,
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
