import Login from "../page/Home/Login";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const useAuth = () => {
  //   const userdata = useSelector((state) => state.auth.user);
  const userdata = localStorage.getItem("user");
  const user = userdata ? { loggedIn: true } : { loggedIn: false };
  console.log(user);
  console.log(userdata);
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  //   console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
