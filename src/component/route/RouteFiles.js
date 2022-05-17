import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../page/Home/Dashboard";
import Login from "../page/Home/Login";
import Signup from "../page/Home/Signup";
import Header from "../page/Home/Header";
import ViewQuestion from "../page/Question/ViewQuestions";
import PostQuestion from "../page/Question/PostQuestion";
import Category from "../page/Category/Category";
import User from "../page/User/User";
import ViewSingleQuestion from "../page/Question/ViewSingleQuestion";
import Spinner from "../spinner/Spinner";
export default function RouteFiles() {
  console.log("KArtik  2 2 2 - karta ohi kam ");
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <div style={{ marginLeft: "285px", paddingTop: "63px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route exact path="/question" element={<ViewQuestion />} />
              <Route path="/post-question" element={<PostQuestion />} />
              <Route path="/question/:id" element={<ViewSingleQuestion />} />
              <Route path="/user" element={<User />} />
              <Route path="/category" element={<Category />} />
              <Route path="/loader" element={<Spinner />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
