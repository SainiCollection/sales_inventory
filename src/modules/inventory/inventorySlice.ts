import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as inventoryAPI from './services/inventoryAPI';
import type { InventoryItem, InventoryState } from './types';

export const fetchItems = createAsyncThunk('inventory/fetchItems', async () => {
  const res = await inventoryAPI.fetchItems();
  return res.data as InventoryItem[];
});

const initialState: InventoryState = { items: [], status: 'idle', error: null };

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default inventorySlice.reducer;
