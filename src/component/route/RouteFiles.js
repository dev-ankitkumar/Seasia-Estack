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
import UserQuestion from "../page/Question/User/UserQuestion";
import { useAuth } from "./ProtectedRoutes";
export default function RouteFiles() {
  const auth = useAuth();
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <div className="screen-area">
            {/* <Header />
          <div style={{ marginLeft: "285px", paddingTop: "63px" }}> */}
            <Routes>
              <Route path="/login" element={auth ? <Dashboard /> : <Login />} />
              <Route
                path="/signup"
                element={auth ? <Dashboard /> : <Signup />}
              />
              <Route path="/" element={<Dashboard />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/post-question" element={<PostQuestion />} />

                <Route path="/profile" element={<Profile />} />
                <Route path="/myquestion" element={<UserQuestion />} />
              </Route>
              <Route path="/user" element={<User />} />
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
