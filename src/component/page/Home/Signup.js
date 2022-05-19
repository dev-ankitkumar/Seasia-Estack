import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../../spinner/Spinner";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    emp_id: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2, emp_id, phone_number } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isLoading, isSuccess, navigate, dispatch]);
  const submitHandle = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("password do not match");
    } else {
      const userData = {
        name,
        email,
        phone_number,
        emp_id,
        password,
      };
      dispatch(register(userData));
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="profile-card m-5 py-4 shadow">
      <section className="">
        <h1>Create your eStack account</h1>
        <p className="ask-for-help">
          Complete the following information to get started.
        </p>
      </section>
      <section className="form">
        <form onSubmit={submitHandle} className="form1">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your Name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="emp_id"
              name="emp_id"
              value={emp_id}
              placeholder="Enter your Employee ID"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="phone_number"
              name="phone_number"
              value={phone_number}
              placeholder="Enter your Phone Number"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your Email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
          <div className="form-check  text-start">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Please check to indicate that you agree with the{" "}
              <span className="text-info pointer">Terms of Use</span>
            </label>
          </div>
          <div className="form-group mt-4">
            <button
              type="submit"
              className="btn btn-success"
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
