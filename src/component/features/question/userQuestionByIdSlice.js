import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionIdService from "./questionIdService";
import userQuestionById from "./userQuestionByIdService";
const initialState = {
  userquestion: [],
  isError: false,
  isSucess: false,
  isLoading: false,
  message: "",
};

//User Posted Question By Id
export const callUserQuestionById = createAsyncThunk(
  "getUserQuestionByID",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.access_token;
      return await userQuestionById.getuserQuestionById(token);
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
export const userQuestionByIdSlice = createSlice({
  name: "userquestion",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(callUserQuestionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(callUserQuestionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucess = true;
        state.userquestion = action.payload;
      })
      .addCase(callUserQuestionById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = userQuestionByIdSlice.actions;
export default userQuestionByIdSlice.reducer;
