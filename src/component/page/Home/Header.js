import { Link, NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import data from "../../assets/jsonfiles/data.json";
import logo from "../../assets/images/logo.svg";
import SideBar from "./bar/SideBar";
import signoutlogo from "../../assets/images/signoutlogo.svg";
import login from "../../assets/images/login.svg";
import signup from "../../assets/images/signup.svg";
import "./dashboard.css";
export default function Header() {
  const [dropDownOption, setDropDownOption] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const btnLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  useEffect(() => {
    // console.log(dropDownOption);
    if (navigate && dropDownOption) {
      setDropDownOption(false);
    }
  }, [navigate]);
  const nameuser = user?.user?.name?.charAt(0).toUpperCase();
  return (
    <>
      <header className="header shadow-sm bg-light">
        <div className="logo">
          <NavLink to="/">
            <div className="d-flex align-items-center fs-2 fw-semibold">
              <img src={logo} alt="" />
              <div>{data.AppName}</div>
            </div>
          </NavLink>
        </div>
        <div>
          <input type="text" placeholder="Search..." className="searchText1" />
        </div>
        <ul className="ul-index">
          {user ? (
            <li className="d-flex align-items-center">
              <span className="p-r-5 pointer">
                Welcome {user ? <>{user.user.name}</> : null}
              </span>

              <button
                type="button"
                className="btn"
                onClick={() => {
                  if (!dropDownOption) {
                    setDropDownOption(true);
                  } else {
                    setDropDownOption(false);
                  }
                }}
              >
                <div className="profile1">
                  <div className="profile2">{nameuser}</div>
                </div>
              </button>
              {dropDownOption ? (
                <div className="dropdown1">
                  <ul className="ul1 flex-column">
                    <li className="li1">
                      <button className="btn" onClick={btnLogout}>
                        <img src={signoutlogo} alt="" />
                        LogOut
                      </button>
                    </li>
                    {/* <li className="li1">Option 2</li>
                    <li className="li1">Option 3</li>
                    <li className="li1">Option 4</li> */}
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </li>
          ) : (
            <li className="d-flex">
              <NavLink to="/login" className="p-r-20">
                <img src={login} alt="" />
                login
              </NavLink>
              <NavLink to="/signup">
                <img src={signup} alt="" />
                Signup
              </NavLink>
            </li>
          )}
        </ul>
      </header>
      <SideBar user={user} />
    </>
  );
}
