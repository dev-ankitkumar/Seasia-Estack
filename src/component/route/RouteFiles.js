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
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "../page/Profile/Profile";
export default function RouteFiles() {
  const isAuthenticated = localStorage.getItem("user");
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <div className="screen-area">
            {/* <Header />
          <div style={{ marginLeft: "285px", paddingTop: "63px" }}> */}
            <Routes>
              <Route
                path="/login"
                element={isAuthenticated ? <Dashboard /> : <Login />}
              />
              <Route
                path="/signup"
                element={isAuthenticated ? <Dashboard /> : <Signup />}
              />

              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/post-question" element={<PostQuestion />} />
                <Route path="/user" element={<User />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route exact path="/question" element={<ViewQuestion />} />
              <Route path="/question/:id" element={<ViewSingleQuestion />} />
              <Route path="/category" element={<Category />} />
              {/* <Route path="/loader" element={<Spinner />} /> */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
