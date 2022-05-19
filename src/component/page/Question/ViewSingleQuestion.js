import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionByID } from "../../features/question/questionIdSlice";
import { questionPostByVoteId } from "../../features/question/questionByVoteSlice";
import { postAnswerByID } from "../../features/question/questionIdSlice";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import Spinner from "../../spinner/Spinner";
import upBtn from "../../assets/images/upBtn.svg";
import downBtn from "../../assets/images/downBtn.svg";
import signup from "../../assets/images/signup.svg";
import CkEditorHtmlShow from "./CkEditorHtmlShow";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function ViewSingleQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const { question, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.questionId
  );

  const newData1 = useSelector((state) => state.question);
  // console.log(newData1);
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
        postAnswerByID({
          question_id: id,
          description: description,
          title: title,
          additional_desc: "addDescription",
        })
      );
      setDescription("");
      setTitle("");
      setAddDescription("");
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
                <div className="fs-5  text-excilips">
                  <CkEditorHtmlShow data={x.description} />
                </div>
                <div className="border-bottom pb-1">{x.additional_desc}</div>
                <div className="fs-6 text-muted d-flex justify-content-between w-100">
                  <div>
                    Created at &nbsp;
                    {new Date(`${x.created_at}`).toDateString()}
                  </div>
                  <div>
                    Updated at &nbsp;
                    {new Date(`${x.updated_at}`).toDateString()}
                  </div>
                </div>
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
                  <img
                    src={upBtn}
                    alt=""
                    className="pointer"
                    onClick={() => {
                      const data = { answer_id: x.id, vote: +1 };
                      dispatch(questionPostByVoteId(data));
                    }}
                  />
                  <img
                    src={downBtn}
                    alt=""
                    className="pointer"
                    onClick={() => {
                      const data = { answer_id: x.id, vote: -1 };

                      dispatch(questionPostByVoteId(data));
                    }}
                  />

                  <div className="single-qust-card w-100">
                    <div className="text-start pointer ">
                      <div className="p-3">
                        <div className="border-bottom pb-1 ">
                          Title: {x.title}
                        </div>
                        <div className="mt-2">
                          <CkEditorHtmlShow data={x.description} />
                        </div>
                        <div className="border-bottom pb-1 ">
                          <div className="border-bottom pb-1">
                            {x.additional_desc}
                          </div>
                        </div>
                        <div className="fs-6 text-muted d-flex justify-content-between w-100">
                          <div>
                            Created at &nbsp;
                            {new Date(`${x.created_at}`).toDateString()}
                          </div>
                          <div>
                            Updated at &nbsp;
                            {new Date(`${x.updated_at}`).toDateString()}
                          </div>
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
        <div>
          <input
            type="text"
            id="email"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

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
        <div>
          <input
            type="text"
            id="email"
            name="addDescription"
            placeholder="Additional Details"
            value={addDescription}
            onChange={(e) => {
              setAddDescription(e.target.value);
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
