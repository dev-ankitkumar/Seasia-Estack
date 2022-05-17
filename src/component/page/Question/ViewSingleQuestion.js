import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionByID } from "../../features/question/questionIdSlice";
import CkEditorHtmlShow from "./CkEditorHtmlShow";
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
    <>
      <div className="text-dark">
        {questiondata?.question.map((x, index) => (
          <section className="form" key={index}>
            <div className="form-group p-t-20 text-start pointer">
              <div className="shadow-sm p-3  bg-body rounded">
                <div>title:{x.title}</div>
                <CkEditorHtmlShow data={x.description} />
                <div>{x.description}</div>
              </div>
            </div>
          </section>
        ))}
      </div>
      <div className="text-dark">
        {questiondata?.answers.map((x) => (
          <>
            <section className="form">
              <div className="form-group p-t-20 text-start pointer">
                <div className="shadow-sm p-3 mb-5 bg-body rounded">
                  <div>title:{x.title}</div>
                  <div>{x.description}</div>
                </div>
              </div>
            </section>
          </>
        ))}
      </div>
    </>
  );
}
