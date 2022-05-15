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
export default function RouteFiles() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <div style={{ marginLeft: "220px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/question" element={<ViewQuestion />} />
              <Route path="/post-question" element={<PostQuestion />} />
              <Route path="/user" element={<User />} />
              <Route path="/category" element={<Category />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
