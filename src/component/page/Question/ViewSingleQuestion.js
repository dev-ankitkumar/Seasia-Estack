import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionByID } from "../../features/question/questionIdSlice";
import { questionPostByVoteId } from "../../features/question/questionByVoteSlice";
import CkEditorHtmlShow from "./CkEditorHtmlShow";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function ViewSingleQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [description, setDescription] = useState("");
  useEffect(() => {
    dispatch(getQuestionByID({ id }));
  }, []);
  const { question, isLoading, isError, message } = useSelector(
    (state) => state.questionId
  );

  const questiondata = question?.data;
  // const new1 = questiondata?.answers.length;
  // if (new1.length < 0) {
  //   console.log(new1, "new1");
  // }
  const answerData = questiondata?.answers.map((x) => {
    // console.log("selected");
    if (x.length !== 0) {
      console.log("selected1");
      <div className="single-qust-card">
        <div className="text-start pointer">
          <div className="p-3">
            <div className="border-bottom pb-1">Title: {x.title}</div>
            <div className="mt-2">
              <CkEditorHtmlShow data={x.description} />
            </div>
            {/* <div className="mt-2">{x.description}</div> */}
          </div>
        </div>
        <button
          onClick={() => {
            const data = { answer_id: x.question_id, vote: +1 };
            dispatch(questionPostByVoteId(data));
          }}
        >
          Vote Click
        </button>
      </div>;
    }
  });
  return (
    <section className="text-dark m-5 pb-4">
      <div>
        {questiondata?.question.map((x, index) => (
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
      <div>{answerData}</div>
      <div className="single-qust-card">
        <div className="text-start pointer">
          <CKEditor
            editor={Editor}
            data=""
            config={{ placeholder: "Enter Your Description..." }}
            // placeholder="Enter Your Description"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              // console.log("Editor is ready to use!", editor);
            }}
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
      </div>
    </section>
  );
}
