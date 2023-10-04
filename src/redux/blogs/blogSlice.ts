import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService, { ICreateResponse } from './blogService';
import { BlogData } from '../../interfaces/blog';
import { RootState } from '../store';

interface IBlogResponse {
  blogs: BlogData[];
  totalCount: number;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | unknown;
  errorMessage: string | unknown;
}

const initialState: IBlogResponse = {
  blogs: [],
  totalCount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  errorMessage: '',
};

// Create new Blog
export const createBlog = createAsyncThunk(
  'blogs/create',
  async (blogData: FormData, thunkAPI) => {
    try {
      return await blogService.createNewBlog(blogData);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBlogs = createAsyncThunk(
  'blogs/getAll',
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      return await blogService.getBlogs({ page, limit });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async (blogData: Partial<BlogData>, thunkAPI) => {
    try {
      return await blogService.updateBlog(blogData);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const blogSlice = createSlice({
  name: 'Blog',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = (action.payload as ICreateResponse).message;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = (action.payload as ICreateResponse).message;
      })
      /* TODO: GET BLOG DATA SET */
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload.data.rows;
        state.totalCount = action.payload.data.count;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      /* TODO: UPDATE BLOG DATA SET */
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = blogSlice.actions;
export const selectCount = (state: RootState) => state.blogs;
export default blogSlice.reducer;
