import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import questionReducer from "../features/question/questionSlice";
import categoryReducer from "../features/category/categorySlice";
import questionIdRedcuer from "../features/question/questionIdSlice";
import questionByVoteReducer from "../features/question/questionByVoteService";
const store = configureStore({
  reducer: {
    auth: authReducer,
    question: questionReducer,
    category: categoryReducer,
    questionId: questionIdRedcuer,
    questionVote: questionByVoteReducer,
  },
});
export default store;
