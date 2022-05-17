import { NavLink } from "react-router-dom";
import "./SideBar.css";
// import world1 from "../Assets/Images/world1.svg";
export default function SideBar(props) {
  return (
    <div className="">
      <div className="flex-shrink-0 p-3 h-sideBar m-top-4 shadow-sm">
        <div className="d-flex flex-column text-start">
          <NavLink
            to="/"
            className="p-b-10 p-t-10 text-color ps-3"
            style={({ isActive }) => ({
              color: isActive ? "black" : "",
              background: isActive ? "#e6e6e6" : "",
              borderRadius: isActive ? "10px" : "",
            })}
          >
            Home
          </NavLink>
          {props.user ? (
            <NavLink
              to="/post-question"
              className="p-b-10 p-t-10 text-color ps-3"
              style={({ isActive }) => ({
                color: isActive ? "black" : "",
                background: isActive ? "#e6e6e6" : "",
                borderRadius: isActive ? "10px" : "",
              })}
            >
              Ask for Questions
            </NavLink>
          ) : (
            <></>
          )}
          {props.user ? (
            <NavLink
              to="/"
              className="p-b-10 p-t-10 text-color"
              style={({ isActive }) => ({
                color: isActive ? "black" : "",
                background: isActive ? "rgb(72 133 225)" : "",
                borderRadius: isActive ? "10px" : "",
              })}
            >
              My Questions
            </NavLink>
          ) : (
            <></>
          )}
          <NavLink
            to="/question"
            className="p-b-10 p-t-10 text-color ps-3"
            style={({ isActive }) => ({
              color: isActive ? "black" : "",
              background: isActive ? "#e6e6e6" : "",
              borderRadius: isActive ? "10px" : "",
            })}
          >
            View Questions
          </NavLink>
          <NavLink
            to="/category"
            className="p-b-10 p-t-10 text-color ps-3"
            style={({ isActive }) => ({
              color: isActive ? "black" : "",
              background: isActive ? "#e6e6e6" : "",
              borderRadius: isActive ? "10px" : "",
            })}
          >
            Category
          </NavLink>
          <NavLink
            to="/user"
            className="p-b-10 p-t-10 text-color ps-3"
            style={({ isActive }) => ({
              color: isActive ? "black" : "",
              background: isActive ? "#e6e6e6" : "",
              borderRadius: isActive ? "10px" : "",
            })}
          >
            User
          </NavLink>
          {/* <NavLink to="/loader">loader</NavLink> */}
        </div>
      </div>
    </div>
  );
}
