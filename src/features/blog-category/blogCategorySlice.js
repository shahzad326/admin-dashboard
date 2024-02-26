import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";

export const getBlogCategory = createAsyncThunk(
  "blogCategory/getBlogCategory",
  async (thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await blogCategoryService.getBlogCategory(timestamp);
    } catch (error) {
      return thunkAPI.rejectedWithValue(error);
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  "blogCategory/createBlogCategory",
  async (blogCategoryData, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      const productWithTimestamp = { ...blogCategoryData, timestamp }; // Add timestamp to productData
      return await blogCategoryService.createBlogCategory(productWithTimestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBlogCategoryById = createAsyncThunk(
  "blogcategory/getblogcategoryById",
  async (id, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await blogCategoryService.getBlogCategoryById(id, timestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlogCategory = createAsyncThunk(
  "Blogcategory/update-blogcategory",
  async (blogcategory, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      const productWithTimestamp = { ...blogcategory, timestamp }; // Add timestamp to productData
      return await blogCategoryService.updateBlogCategory(productWithTimestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlogCategory = createAsyncThunk(
  "blogcategory/delete-blogcategory",
  async (id, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await blogCategoryService.deleteBlogCategory(id, timestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  blogCategory: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogCategorySlice = createSlice({
  name: "blogCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogCategory = action.payload;
      })
      .addCase(getBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdBlogCategory = action.payload;
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(getBlogCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogCategoryName = action.payload.getBlogCategory.title;
      })
      .addCase(getBlogCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedBlogCategory = action.payload;
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedBlogCategory = action.payload;
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default blogCategorySlice.reducer;
