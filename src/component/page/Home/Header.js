import { Link, NavLink, useNavigate } from "react-router-dom";
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
      <header className="header shadow-sm text-white">
        <div className="logo">
          <NavLink to="/">
            <div className="d-flex align-items-center fs-2 fw-semibold">
              <img src={logo} alt="" />
              <div className="h3 my-auto text-light">{data.AppName}</div>
            </div>
          </NavLink>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="searchText1" />
        </div>
        <ul className="ul-index">
          {user ? (
            <li className="d-flex align-items-center">

              {/* <NavLink to="/post-question" className="pe-3 ask-for-help">
                Ask for Help!
              </NavLink> */}


              <span className="p-r-5 pointer">

                Welcome {user ? <span className="fw-bold ask-for-help">{user.user.name}</span> : null}

              </span>

              <button
                type="button"
                className="btn profile0"
                onClick={()=>{setDropDownOption(!dropDownOption)}}
              >
                <div className="profile1">
                  <div className="profile2">{nameuser}</div>
                </div>
              </button>
              {dropDownOption ? (
                <div onClick={()=>{setDropDownOption(false)}} className="backDrop">
                <div className="dropdown1">
                  <ul className="ul1 flex-column my-auto">
                    <li className="fw-bold border-bottom mx-3 mb-3">{user.user.name}</li>
                    <li className="mx-auto" ><p className="text-info pointer fs-5 fw-semibold">
                      <NavLink to="/profile">
                        My Profile
                      </NavLink>
                    </p></li>
                    <li className="">
                      <button className="btn btn-danger" onClick={btnLogout}>
                        <img src={signoutlogo} className="me-2" alt="" />
                        LogOut
                      </button>
                    </li>
                    {/* <li className="li1">Option 2</li>
                    <li className="li1">Option 3</li>
                    <li className="li1">Option 4</li> */}
                  </ul>
                </div>
                </div>
              ) : (
                <></>
              )}
            </li>
          ) : (
            <li className="d-flex">
              <NavLink
                to="/login"
                className="btn btn-success text-white p-r-20 me-2"
              >
                <img src={login} alt="" className="me-2" />
                login
              </NavLink>
              <NavLink
                to="/signup"
                className="btn btn-outline-success text-white"
              >
                <img src={signup} alt="" className="me-2" />
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
