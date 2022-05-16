import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionService from "./questionService";
// const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  question: [],
  isError: false,
  isSucess: false,
  isLoading: false,
  message: "",
};

export const getQuestionByID = createAsyncThunk(
  "getQuestionByID",
  async (idData, thunkApi) => {
    try {
      return await questionService.questionGetByID(idData);
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

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionByID.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getQuestionByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucess = true;
        state.question.push(action.payload);
      })
      .addCase(getQuestionByID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.question = null;
      });
  },
});
export const { reset } = questionSlice.actions;
export default questionSlice.reducer;
