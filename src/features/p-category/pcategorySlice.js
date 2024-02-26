import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productCategoryService from "./pcategoryService";

export const getProductCategory = createAsyncThunk(
  "productcategory/get-productCategory",
  async (thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await productCategoryService.getProductCategory(timestamp);
    } catch (error) {
      return thunkAPI.rejectedWithValue(error);
    }
  }
);

export const createProductCategory = createAsyncThunk(
  "productcategory/create-productCategory",
  async (productCategory, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      const productWithTimestamp = { ...productCategory, timestamp }; // Add timestamp to productData
      return await productCategoryService.createProductCategory(
        productWithTimestamp
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductCategoryById = createAsyncThunk(
  "productcategory/getproductcategoryById",
  async (id, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await productCategoryService.getProductCategoryById(id, timestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProductCategory = createAsyncThunk(
  "productcategory/update-productcategory",
  async (productcategory, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      const productWithTimestamp = { ...productcategory, timestamp }; // Add timestamp to productData
      return await productCategoryService.updateProductCategory(
        productWithTimestamp
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProductCategory = createAsyncThunk(
  "productcategory/delete-productcategory",
  async (id, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await productCategoryService.deleteProductCategory(id, timestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  productcategory: [],

  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productCategorySlice = createSlice({
  name: "productcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productcategory = action.payload;
      })
      .addCase(getProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdPCategory = action.payload;
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pCategoryName = action.payload.getProductCategory.title;
      })
      .addCase(getProductCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedPCategory = action.payload;
      })
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletePCategory = action.payload;
      })
      .addCase(deleteProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default productCategorySlice.reducer;
