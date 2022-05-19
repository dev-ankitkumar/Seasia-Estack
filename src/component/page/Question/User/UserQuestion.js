import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserQuestionByID } from "../../../features/question/questionIdSlice";
export default function UserQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { question, isLoading, isError, message, isSuccess } = useSelector(
  //   (state) => state.questionId
  // );
  useEffect(() => {
    dispatch(getUserQuestionByID());
    console.log("oncall navigate");
  }, []);
  return <div>UserQuestion</div>;
}
