import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionByVote from "./questionByVoteService";
const initialState = {
  questionVote: [],
  isError: false,
  isSucess: false,
  isLoading: false,
  message: "",
};

export const questionPostByVoteId = createAsyncThunk(
  "questionPostByVoteId",
  async (userData, thunkApi) => {
    console.log("vote pack");
    try {
      const token = thunkApi.getState().auth.user.access_token;
      return await questionByVote.questionPostByVoteId(userData, token);
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
export const questionIdByVoteSlice = createSlice({
  name: "questionVote",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(questionPostByVoteId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(questionPostByVoteId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucess = true;
        state.questionVote = action.payload;
      })
      .addCase(questionPostByVoteId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = questionIdByVoteSlice.actions;
export default questionIdByVoteSlice.reducer;
