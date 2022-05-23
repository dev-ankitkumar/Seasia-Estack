import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callUserQuestionById } from "../../../features/question/userQuestionByIdSlice";
import CkEditorHtmlShow from "../CkEditorHtmlShow";
import Spinner from "../../../spinner/Spinner";
export default function UserQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userquestion, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.questionUser
  );
  const callApi = async () => {
    await dispatch(callUserQuestionById());
  };
  useEffect(() => {
    callApi();
  }, [navigate]);
  userquestion?.data?.map((x, index) => {
    console.log(x);
  });
  if (isLoading) return <Spinner />;

  return (
    <div className="Questions-div">
      <section className="">
        <div className="form-group p-t-20 text-start pointer">
          {userquestion?.data ? (
            userquestion?.data?.map((x, index) => (
              <>
                <div key={index} className="mb-4">
                  <NavLink to={`/question/${x.id}`}>
                    <div className="shadow-sm p-3 bg-light rounded text-black question-Card1 ">
                      {/* <div className="fs-3 fw-semibold">{x.id}</div> */}
                      <div className="fs-4 fw-semibold border-bottom mb-2 pb-1">
                        {x.title}
                      </div>
                      <div className="fs-5  text-excilips">
                        <CkEditorHtmlShow data={x.description} />
                        {/* {x.description} */}
                      </div>
                      {/* <div>{x.user_id}</div> */}
                      <div className="fs-6 text-muted d-flex justify-content-between w-100">
                        <div>
                          Created at{" "}
                          {new Date(`${x.created_at}`).toDateString()}
                        </div>
                        <div>
                          Updated_at at{" "}
                          {new Date(`${x.updated_at}`).toDateString()}
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              </>
            ))
          ) : (
            <div>No Questions Posted Yet</div>
          )}
        </div>
      </section>
    </div>

    // <div>
    //   <div>
    //     {userquestion?.data ? (
    //       userquestion?.data?.map((x) => (
    //         <>
    //           <NavLink to={`/question/${x.id}`}>
    //             <div>{x.title}</div>
    //             <div>{x.title}</div>
    //             <div className="text-dark">
    //               <CkEditorHtmlShow data={x.description} />
    //             </div>
    //             <div>{x.additional_desc}</div>
    //             <div>{x.cateogry_id}</div>
    //             <div>{x.created_at}</div>
    //             <div>{x.updated_at}</div>
    //           </NavLink>
    //         </>
    //       ))
    //     ) : (
    //       <div>No Data Added</div>
    //     )}
    //   </div>
    // </div>
  );
}
