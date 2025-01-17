import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (arg, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);




const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  }, reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addProductToCart } = productsSlice.actions;

export default productsSlice.reducer;