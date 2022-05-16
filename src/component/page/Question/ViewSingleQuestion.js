import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionByID } from "../../features/question/questionIdSlice";

export default function ViewSingleQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getQuestionByID({ id }));
  }, [navigate, dispatch]);

  //   const { question, isLoading, isError, message } = useSelector(
  //     (state) => state.questionId
  //   );
  //   const newData = question?.console.log(newData);
  return <div>ViewSingleQuestion</div>;
}
