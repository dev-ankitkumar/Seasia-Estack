import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import makeAnimated from 'react-select/animated';
import { getCategory } from '../../features/category/categorySlice';
import Select from 'react-select';
// import "./askQuestion.css";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postQuestion } from '../../features/question/questionSlice';
import { toast } from 'react-toastify';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Button } from 'bootstrap';

export default function AskQuestion() {
  const [category_id, setCategory_id] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const selector = useSelector();
  const { category, isLoading, isError, message, reset } = useSelector(
    state => state.category
  );
  useEffect(() => {
    if (isError) {
      console.log('Error ');
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

  const btnSubmit = e => {
    e.preventDefault();
    console.log(category_id[0].value, 'cateogry_id');
    if (!title && !description) {
      toast.error('Enter the Content', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const cateogry_id = category_id[0].value;
      dispatch(postQuestion({ cateogry_id, title, description, post_type: 1 }));

      toast.success('Question Posted Successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate('/');
    }
  };

  const renderTooltip = props => (
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
                  Be specific and imagine you’re asking a question to another
                  person
                </Tooltip>
              }
            >
              <label  id="label-title">Title</label>
              {/* <button variant="secondary">Tooltip on {placement}</button> */}
            </OverlayTrigger>
            {/* <label>
              Be specific and imagine you’re asking a question to another person
            </label> */}
            <input
              type="text"
              id="email"
              name="title"
              placeholder="Title"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="question-title margin text-dark">
            <CKEditor
              editor={ClassicEditor}
              data=""
              config={{ placeholder: 'Enter Your Description...' }}
              // placeholder="Enter Your Description"
              onReady={editor => {
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
          <div className="question-title p-t-10 w-25">
            <label>
              Tags
            </label>
            <Select className='text-dark'
              classNamePrefix="tag-list"
              closeMenuOnSelect={false}
              isMulti
              options={OptionsCheck}
              onChange={e => {
                setCategory_id(e);
              }}
            />
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
