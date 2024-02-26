import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlog = createAsyncThunk("blogs/get-blogs", async (thunkAPI) => {
  try {
    const timestamp = new Date().getTime();
    return await blogService.getBlog(timestamp);
  } catch (error) {
    return thunkAPI.rejectedWithValue(error);
  }
});

export const createBlog = createAsyncThunk(
  "blogs/create-blogs",
  async (blogData, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      const productWithTimestamp = { ...blogData, timestamp }; // Add timestamp to blogData
      return await blogService.createBlog(productWithTimestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBlogById = createAsyncThunk(
  "blogs/getBlogById",
  async (id, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await blogService.getBlogById(id, timestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/update-blog",
  async (blog, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      const productWithTimestamp = { ...blog, timestamp }; // Add timestamp to productData
      return await blogService.updateBlog(productWithTimestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete-blog",
  async (id, thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await blogService.deleteBlog(id, timestamp);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  blogs: [],

  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlog = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBlogById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogName = action.payload;
        state.blogTitle = action.payload.blog.title;
        state.blogDescription = action.payload.blog.description;
        state.blogCategoy = action.payload.blog.category;
        state.blogImages = action.payload.blog.images;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedBlog = action.payload;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
