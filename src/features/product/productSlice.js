import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProduct = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await productService.getProduct(timestamp);
    } catch (error) {
      return thunkAPI.rejectedWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create-products",
  async (productData, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      const productWithTimestamp = { ...productData, timestamp }; // Add timestamp to productData
      return await productService.createProduct(productWithTimestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  createdProduct: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
