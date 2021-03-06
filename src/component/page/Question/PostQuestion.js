import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import makeAnimated from "react-select/animated";
import { getCategory } from "../../features/category/categorySlice";
import Select from "react-select";
// import "./askQuestion.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postQuestion } from "../../features/question/questionSlice";
import { toast } from "react-toastify";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Button } from "bootstrap";
import Creatable from "react-select/creatable";

export default function AskQuestion() {
  const [category_id, setCategory_id] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const selector = useSelector();
  const { category, isLoading, isError, message, reset } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (isError) {
      console.log("Error ");
    }
    dispatch(getCategory());
    // return () => {
    // dispatch(reset());
    // };
  }, []);

  const OptionsCheck = category?.info?.map((x, index) => {
    return { value: x.id, label: x.category };
  });
  const myArray = [];
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const btnSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Enter the title", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
    if (!description) {
      toast.error("Enter the Content", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
    if (!category_id) {
      toast.error("Enter the Category", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }

    const cateogry_id = category_id[0].value;
    dispatch(
      postQuestion({
        cateogry_id,
        title,
        description,
        post_type: 1,
        additional_desc: addDescription,
      })
    );

    toast.success("Question Posted Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate("/myquestion");
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  return (
    <div className="mt-5 pb-5">
      <section className="form">
        <div className="form-group">
          <div className="question-title margin">
            <OverlayTrigger
              key="title"
              placement="right"
              overlay={
                <Tooltip id={`tooltip-right`}>
                  Be specific and imagine you???re asking a question to another
                  person
                </Tooltip>
              }
            >
              <label id="label-title" className="text-bold">
                Title
              </label>
              {/* <button variant="secondary">Tooltip on {placement}</button> */}
            </OverlayTrigger>
            {/* <label>
              Be specific and imagine you???re asking a question to another person
            </label> */}
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
          <div className="question-title margin text-dark p-b-20 ">
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
          <div>
            <input
              type="text"
              id="email"
              name="desc"
              placeholder="Additional Information"
              value={addDescription}
              onChange={(e) => {
                setAddDescription(e.target.value);
              }}
            />
          </div>
          <div className="d-flex justify-content-between">
            <div className="question-title p-t-10 w-25">
              <label>Category</label>
              <Select
                className="text-dark"
                classNamePrefix="tag-list"
                closeMenuOnSelect={false}
                isMulti
                options={OptionsCheck}
                onChange={(e) => {
                  setCategory_id(e);
                }}
              />
            </div>
            <div className="question-title p-t-10 w-25">
              <label>Tags</label>
              <Creatable
                isMulti
                className="text-dark"
                classNamePrefix="tag-list"
                options={options}
              />
            </div>
          </div>
          <div className="text-start p-top-20">
            <button className="btn btn-success" onClick={btnSubmit}>
              Submit
            </button>
          </div>
        </div>

        {/* </form> */}
      </section>
    </div>
  );
}
