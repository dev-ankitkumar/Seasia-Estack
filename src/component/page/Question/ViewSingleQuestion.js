import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionByID } from "../../features/question/questionIdSlice";

export default function ViewSingleQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("before use Effect");
  useEffect(() => {
    console.log("use effect");

    dispatch(getQuestionByID({ id }));
  }, []);
  const { question, isLoading, isError, message } = useSelector(
    (state) => state.questionId
  );

  const questiondata = question?.data;
  return (
    <section  className="text-dark m-5 pb-4">
      <div>
        {questiondata?.question.map((x, index) => (
          <div className="single-qust-card" key={index}>
            <div className="text-start pointer">
              <div className="p-3">
                <div className="border-bottom pb-1">Title: {x.title}</div>
                <div className="mt-2">{x.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {questiondata?.answers.map((x) => (
          <>
            <div className="single-qust-card">
              <div className="text-start pointer">
                <div className="p-3">
                  <div className="border-bottom pb-1">Title: {x.title}</div>
                  <div className="mt-2">{x.description}</div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}
