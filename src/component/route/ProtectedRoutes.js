import Login from "../page/Home/Login";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export const useAuth = () => {
  //   const userdata = useSelector((state) => state.auth.user);
  const userdata = JSON.parse(localStorage.getItem("user"));
  console.log(userdata);
  const user = userdata?.access_token
    ? { loggedIn: true }
    : { loggedIn: false };

  return user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  //   console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
