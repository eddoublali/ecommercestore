import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);

export const getProductinfo = createAsyncThunk(
  'products/getProductinfo',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/products?id=${id}`);
      return response.data[0]; // Return first item since query returns array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch product");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductinfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductinfo.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductinfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;