import { NavLink, useNavigate } from "react-router-dom";
import Postpagination from "../Pagination/Pagination";
import CkEditorHtmlShow from "./CkEditorHtmlShow";
export default function FilteredQuestion({
  question,
  indexOfFirstpost,
  indexOfLastPost,
  categorySelection,
  paginate,
  postsPerPage,
}) {
  const filteredPosts1 = [];

  const filtereddata = question
    ?.filter((x) => x.cateogry_id == `${categorySelection}`)
    .map((x) => {
      filteredPosts1.push(x);
    });
  const filteredPosts = filteredPosts1.slice(indexOfFirstpost, indexOfLastPost);
  const datafilter = filteredPosts.map((x, index) => (
    <div key={index}>
      <NavLink to={`/question/${x.id}`}>
        <div
          key={index}
          className="shadow-sm p-3 mb-5 bg-body rounded text-black"
        >
          <div className="fs-3 fw-semibold">{x.title}</div>
          <div className="fs-5  text-excilips">
            <CkEditorHtmlShow data={x.description} />
            {/* {x.description} */}
          </div>
        </div>
      </NavLink>
    </div>
  ));
  console.log(filtereddata.length);
  return (
    <>
      {filtereddata.length === 0 ? (
        <div>No Data Available</div>
      ) : (
        <>
          {datafilter}

          {filtereddata.length > 5 ? (
            <Postpagination
              postsPerPage={postsPerPage}
              totalPosts={filtereddata.length}
              paginate={paginate}
            />
          ) : null}
        </>
      )}
    </>
  );
}
