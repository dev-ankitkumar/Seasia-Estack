import Login from "../page/Home/Login";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const useAuth = () => {
  //   const userdata = useSelector((state) => state.auth.user);
  const userdata = JSON.parse(localStorage.getItem("user"));

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
