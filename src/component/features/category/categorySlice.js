import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";
const initialState = {
  category: [],
  isError: null,
  isLoading: null,
  isSucess: null,
  message: "",
};

export const getCategory = createAsyncThunk(
  "ViewCategory",
  async (_, thunkApi) => {
    try {
      return await categoryService.categoryGet();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.string();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucess = true;
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.question = null;
      });
  },
});
export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
