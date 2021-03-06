import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionIdService from "./questionIdService";
const initialState = {
  question: [],
  isError: false,
  isSucess: false,
  isLoading: false,
  message: "",
};
//get Answer By Question Id
export const getQuestionByID = createAsyncThunk(
  "getQuestionByID",
  async (idData, thunkApi) => {
    try {
      console.log("clicked1");
      return await questionIdService.questionGetByID(idData);
    } catch (error) {
      console.log("clicke2");
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
//Post Answer Comment
export const postAnswerByID = createAsyncThunk(
  "postAnswerById",
  async (userData, thunkApi) => {
    console.log(userData);
    try {
      const token = thunkApi.getState().auth.user.access_token;
      return await questionIdService.AnswerPostById(userData, token);
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
//User Posted Question By Id
export const getUserQuestionByID = createAsyncThunk(
  "getUserQuestionByID",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.access_token;
      return await questionIdService.userQuestionByID(token);
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
export const questionIdSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucess = true;
        state.question = action.payload;
      })
      .addCase(getQuestionByID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(postAnswerByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postAnswerByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucess = true;
        state.question = action.payload;
      })
      .addCase(postAnswerByID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = questionIdSlice.actions;
export default questionIdSlice.reducer;
