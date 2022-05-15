import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import makeAnimated from "react-select/animated";
import Select from "react-select";
// import "./askQuestion.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postQuestion } from "../../features/question/questionSlice";
import { toast } from "react-toastify";

export default function AskQuestion() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const selector = useSelector();
  // const options1 = tagsData?.data?.info.map((x) => {
  //   return "{ value: `${x.id}`, label: `${x.category}`" ;
  // }1
  // );
  const myArray = [];

  const btnSubmit = (e) => {
    e.preventDefault();
    dispatch(postQuestion({ title, post_type: 1 }));
    navigate("/");
    toast.success("Question Posted Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleAnswerechange(e) {}

  return (
    <div>
      <h1 className="question_page_heading">Ask a public question</h1>
      <section className="form">
        {/* <form onClick={btnSubmit}> */}
        <div className="form-group">
          <div className="question-title margin">
            <label id="label-title">Title</label>
            <label>
              Be specific and imagine you’re asking a question to another person
            </label>
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
          <div className="question-title margin">
            <CKEditor
              editor={ClassicEditor}
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
          {/* <div className="question-title">
            <label>Tags</label>
            <Select
              closeMenuOnSelect={false}
              isMulti
              // options={newData}
              onChange={(e) => {
                setSelectedOption(e);
              }}
            />
          </div> */}
          <div className="question-title p-top-15">
            <button className="btn btn-block" onClick={btnSubmit}>
              Submit
            </button>
          </div>
        </div>
        {/* </form> */}
      </section>
    </div>
  );
}
