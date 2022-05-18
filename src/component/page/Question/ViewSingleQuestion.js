import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionByID } from "../../features/question/questionIdSlice";
import { questionPostByVoteId } from "../../features/question/questionByVoteSlice";
import { postAnswerByID } from "../../features/question/questionIdSlice";
import CkEditorHtmlShow from "./CkEditorHtmlShow";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import Spinner from "../../spinner/Spinner";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function ViewSingleQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [description, setDescription] = useState("");

  const { question, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.questionId
  );

  const newData1 = useSelector((state) => state.question);
  console.log(newData1);
  useEffect(() => {
    dispatch(getQuestionByID({ id }));
    console.log("oncall navigate");
  }, [isSuccess, isError]);

  if (isLoading) return <Spinner />;

  const questiondata = question?.data;

  const handleAnswerBtn = async (e) => {
    console.log("calllllllllllllllllllll");
    e.preventDefault();
    if (description) {
      await dispatch(
        postAnswerByID({ question_id: id, description: description })
      );
      setDescription("");
      dispatch(getQuestionByID({ id }));
    }
  };
  return (
    <section className="text-dark m-5 pb-4">
      <div>Ankit</div>
      <div>
        {questiondata?.question?.map((x, index) => (
          <div className="single-qust-card" key={index}>
            <div className="text-start pointer">
              <div className="p-3">
                <div className="border-bottom pb-1">Title: {x.title}</div>
                <CkEditorHtmlShow data={x.description} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-secondary ">
        <div>
          {questiondata?.answers?.map(
            (x, index) =>
              x.length !== 0 && (
                <div className="d-flex align-items-center" key={index}>
                  <button
                    className="btn btn-success h-100"
                    onClick={() => {
                      const data = { answer_id: x.id, vote: +1 };
                      dispatch(questionPostByVoteId(data));
                    }}
                  >
                    Vote Click
                  </button>
                  <div className="single-qust-card w-100">
                    <div className="text-start pointer ">
                      <div className="p-3">
                        <div className="border-bottom pb-1 ">
                          Title: {x.title}
                        </div>
                        <div className="mt-2">
                          <CkEditorHtmlShow data={x.description} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <div className="single-qust-card">
        <div className="text-start pointer">
          <CKEditor
            editor={Editor}
            data={description}
            config={{ placeholder: "Enter Your Description..." }}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
            onBlur={(event, editor) => {
              // console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              // console.log("Focus.", editor);
            }}
          />
        </div>
        <button onClick={handleAnswerBtn} className="btn btn-primary ">
          Submit Your Answer
        </button>
      </div>
    </section>
  );
}
