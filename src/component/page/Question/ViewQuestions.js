import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/auth/authSlice";
import { getCategory } from "../../features/category/categorySlice";
import { getQuestion } from "../../features/question/questionSlice";
import Spinner from "../../spinner/Spinner";
export default function ViewQuestion() {
  const [categorySelection, setCategorySelection] = useState("");
  const [filterCategory, setFilterCategory] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { question, isLoading, isError, message } = useSelector(
    (state) => state.question
  );
  const { category } = useSelector((state) => state.category);
  useEffect(() => {
    if (isError) {
      console.log("Error ");
    }
    dispatch(getQuestion());
    dispatch(getCategory());
    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);
  // if (isLoading) {
  // <div style={{ backgroundColor: "red" }}>Loading</div>;
  // }
  // console.log(categorySelection);
  return (
    <>
      <div className="d-flex">
        <section className="form">
          <div className="form-group p-t-20 text-start pointer">
            {!filterCategory
              ? question?.map((x, index) => (
                  <div
                    key={index}
                    className="shadow-sm p-3 mb-5 bg-body rounded"
                  >
                    <div className="fs-3 fw-semibold">{x.title}</div>
                    <div className="fs-5">{x.description}</div>
                  </div>
                ))
              : question
                  ?.filter((x) => x.cateogry_id == `${categorySelection}`)
                  .map((x, index) => (
                    <div
                      key={index}
                      className="shadow-sm p-3 mb-5 bg-body rounded"
                    >
                      <div className="fs-3 fw-semibold">{x.title}</div>
                      <div className="fs-5">{x.description}</div>
                    </div>
                  ))}
          </div>
        </section>
        <section className="w-25  shadow-sm bg-light">
          <div className="form-group p-t-20">
            <div>Categories</div>
            <button
              className="btn"
              onClick={() => {
                setFilterCategory(false);
              }}
            >
              All
            </button>
            {category?.info?.map((x, index) => (
              <div key={index}>
                <button
                  className="btn"
                  onClick={() => {
                    setFilterCategory(true);
                    setCategorySelection(x.id);
                  }}
                >
                  {x.category}
                </button>
                {/* <div>Description:{x.description}</div> */}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
