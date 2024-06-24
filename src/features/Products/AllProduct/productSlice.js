import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllProducts, GetSingleProduct } from './productAPI';

const initialState = {
  products: [],
  singleProduct: null,
  status: 'idle',
  loading: false,
  error: null,
};

// Async thunk to fetch all products using axios
export const fetchAllProductsAsync = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetAllProducts();
      if (!response) {
        throw new Error('Invalid response from server');
      }
      return response; // Assuming the API response structure has a 'data' property
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch a single product using axios
export const fetchSingleProductAsync = createAsyncThunk(
  'products/fetchSingleProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await GetSingleProduct(productId);
      if (!response || response.status !== 200 || !response.data) {
        throw new Error('Invalid response from server');
      }
      return response.data; // Assuming the API response structure has a 'data' property
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleProductAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.singleProduct = action.payload; // Update with the fetched product object
      })
      .addCase(fetchSingleProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectProducts = (state) => state.products.products;
export const selectSingleProduct = (state) => state.products.singleProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;