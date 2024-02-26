import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColor = createAsyncThunk(
  "color/get-colors",
  async (thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await colorService.getColor(timestamp);
    } catch (error) {
      return thunkAPI.rejectedWithValue(error);
    }
  }
);

export const createColor = createAsyncThunk(
  "color/create-color",
  async (colorData, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      const productWithTimestamp = { ...colorData, timestamp }; // Add timestamp to productData
      return await colorService.createColor(productWithTimestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getColorById = createAsyncThunk(
  "color/getColorById",
  async (id, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await colorService.getColorById(id, timestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateColor = createAsyncThunk(
  "color/update-color",
  async (colorData, thunkAPI) => {
    console.log(colorData);
    try {
      const timestamp = new Date().getTime();
      const productWithTimestamp = { ...colorData, timestamp }; // Add timestamp to productData
      return await colorService.updateColor(productWithTimestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "color/delete-color",
  async (id, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await colorService.deleteColor(id, timestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  colors: [],
  createdColor: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getColorById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colorName = action.payload.getColor.title;
      })
      .addCase(getColorById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedColor = action.payload;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedColor = action.payload;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
