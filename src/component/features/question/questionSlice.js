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

export const getQuestion = createAsyncThunk(
  "viewQuestion",
  async (_, thunkApi) => {
    try {
      return await questionService.questionGet();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const postQuestion = createAsyncThunk(
  "postQuestion",
  async (questionData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.access_token;
      return await questionService.questionPost(questionData, token);
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
      .addCase(postQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucess = true;
        state.question.push(action.payload);
      })
      .addCase(postQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.question = null;
      })
      .addCase(getQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucess = true;
        state.question = action.payload;
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.question = null;
      });
  },
});
export const { reset } = questionSlice.actions;
export default questionSlice.reducer;
