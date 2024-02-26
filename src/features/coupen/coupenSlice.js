import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coupenService from "./coupenService";

export const getCoupen = createAsyncThunk(
  "coupen/get-coupen",
  async (thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await coupenService.getCoupen(timestamp);
    } catch (error) {
      return thunkAPI.rejectedWithValue(error);
    }
  }
);

export const createCoupen = createAsyncThunk(
  "coupen/create-coupen",
  async (coupenData, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      const productWithTimestamp = { ...coupenData, timestamp }; // Add timestamp to blogData
      return await coupenService.createCoupen(productWithTimestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCoupenById = createAsyncThunk(
  "coupen/getCoupenById",
  async (id, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await coupenService.getCoupenById(id, timestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCoupen = createAsyncThunk(
  "coupen/update-coupen",
  async (coupenData, thunkAPI) => {
    console.log(coupenData);
    try {
      const timestamp = new Date().getTime();
      const productWithTimestamp = { ...coupenData, timestamp }; // Add timestamp to productData
      return await coupenService.updateCoupen(productWithTimestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCoupen = createAsyncThunk(
  "coupen/delete-coupen",
  async (id, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await coupenService.deleteCoupen(id, timestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  coupens: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const coupenSlice = createSlice({
  name: "coupen",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupens = action.payload;
      })
      .addCase(getCoupen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCoupen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCoupen = action.payload;
      })
      .addCase(createCoupen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getCoupenById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupenById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.coupenName = action.payload.data;
        state.coupenname = action.payload.data.name;
        state.coupenexpiry = action.payload.data.expiry;
        state.coupendiscount = action.payload.data.discount;
      })
      .addCase(getCoupenById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateCoupen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoupen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedCoupen = action.payload;
      })
      .addCase(updateCoupen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCoupen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedCoupen = action.payload;
      })
      .addCase(deleteCoupen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default coupenSlice.reducer;
