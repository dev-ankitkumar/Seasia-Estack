import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { reset } from "../../features/auth/authSlice";
import { getCategory } from "../../features/category/categorySlice";
import { getQuestionByID } from "../../features/question/questionIdSlice";
import { getQuestion } from "../../features/question/questionSlice";
import FilteredQuestion from "./FilteredQuestion";
import Spinner from "../../spinner/Spinner";
import CkEditorHtmlShow from "./CkEditorHtmlShow";
// import Pagination from "../Pagination/Pagination";
import Postpagination from "../Pagination/Pagination";
export default function ViewQuestion() {
  const [categorySelection, setCategorySelection] = useState("");
  const [filterCategory, setFilterCategory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { question, isLoading, isError, message } = useSelector(
    (state) => state.question
  );

  const { category } = useSelector((state) => state.category);

  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstpost = indexOfLastPost - postsPerPage;

  const currentPosts = question.slice(indexOfFirstpost, indexOfLastPost);

  const filteredPosts1 = [];
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getApiCall = async () => {
    await dispatch(getQuestion());
    dispatch(getCategory());
  };
  useEffect(() => {
    if (isError) {
      console.log("Error ");
    }
    getApiCall();
    // return () => {
    //   dispatch(reset());
    // };
  }, [navigate, isError, message, dispatch]);
  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="Questions-div">
        <section className="">
          <div className="form-group p-t-20 text-start pointer">
            {!filterCategory ? (
              currentPosts?.map((x, index) => (
                <>
                  <div key={index} className="mb-4">
                    <NavLink to={`/question/${x.id}`}>
                      <div className="shadow-sm p-3 bg-light rounded text-black question-Card ">
                        {/* <div className="fs-3 fw-semibold">{x.id}</div> */}
                        <div className="fs-4 fw-semibold border-bottom mb-2 pb-1">
                          {x.title}
                        </div>
                        <div className="fs-5  text-excilips">
                          <CkEditorHtmlShow data={x?.description} />
                          {/* {x.description} */}
                        </div>
                        {/* <div>{x.user_id}</div> */}
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
                        <div>
                          {category?.info
                            ?.filter((y) => y.id == `${x.cateogry_id}`)
                            .map((z, index) => (
                              <div className="btn btn-light">{z.category}</div>
                            ))}
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </>
              ))
            ) : (
              <FilteredQuestion
                question={question}
                indexOfLastPost={indexOfLastPost}
                indexOfFirstpost={indexOfFirstpost}
                categorySelection={categorySelection}
                postsPerPage={postsPerPage}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}

            {!filterCategory ? (
              <Postpagination
                postsPerPage={postsPerPage}
                totalPosts={question.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <></>
            )}
          </div>
        </section>
        <section className="shadow-sm question-rightBar">
          <div className="form-group p-t-20">
            <div className="rightBar-heading">Categories</div>
            <div className="rightBar-body custom-scroller">
              <p
                className="pointer"
                onClick={() => {
                  setFilterCategory(false);
                }}
              >
                All
              </p>
              {category?.info?.map((x, index) => (
                <div key={index}>
                  <p
                    className="pointer"
                    onClick={() => {
                      setFilterCategory(true);
                      setCategorySelection(x.id);
                      setCurrentPage(1);
                    }}
                  >
                    {x.category}
                  </p>
                  {/* <div>Description:{x.description}</div> */}
                </div>
              ))}
            </div>
          </div>
          <div className="form-group p-t-20">
            <div className="rightBar-heading">Tags</div>
            <div className="rightBar-body custom-scroller">
              <p
                className="pointer"
                onClick={() => {
                  setFilterCategory(false);
                }}
              >
                All
              </p>
              {category?.info?.map((x, index) => (
                <div key={index}>
                  <p
                    className="pointer"
                    onClick={() => {
                      setFilterCategory(true);
                      setCategorySelection(x.id);
                      setCurrentPage(1);
                    }}
                  >
                    {x.category}
                  </p>
                  {/* <div>Description:{x.description}</div> */}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
