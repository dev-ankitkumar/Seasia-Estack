import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import questionReducer from "../features/question/questionSlice";
import categoryReducer from "../features/category/categorySlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    question: questionReducer,
    category: categoryReducer,
  },
});
export default store;
