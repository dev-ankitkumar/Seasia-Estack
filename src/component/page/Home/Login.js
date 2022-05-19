// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { login, reset } from "../../features/auth/authSlice";
// import Spinner from "../../spinner/Spinner";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const { email, password } = formData;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isLoading, isError, isSucess, message } = useSelector(
//     (state) => state.auth
//   );
//   useEffect(() => {
//     console.log(user);
//     if (user?.message == "Invalid Credentials") {
//       toast.error(user.message);
//       navigate("/login");
//       dispatch(reset());
//     } else if (user?.access_token) {
//       navigate("/");
//       toast.success("Welcome Back", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//   }, [user, isSucess]);

//   const handleChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   const submitHandle = (e) => {
//     e.preventDefault();
//     const userData = {
//       email,
//       password,
//     };
//     dispatch(login(userData));
//   };
//   if (isLoading) {
//     return <Spinner />;
//   }
//   return (
//     <section className="profile-card m-5 py-5 shadow">
//       <section className="h1 text-white mb-4">
//         <p>Enter Your Details </p>
//       </section>
//       <section className="form">
//         <form onSubmit={submitHandle} className="form1">
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control"
//               id="email"
//               name="email"
//               value={email}
//               placeholder="Enter your Email"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               value={password}
//               placeholder="Enter password"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-check text-start">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="exampleCheck1"
//             />
//             <label className="form-check-label" for="exampleCheck1">
//               Remember me
//             </label>
//           </div>
//           <div className="form-group mt-4">
//             <button
//               type="submit"
//               className="btn btn-success"
//               disabled={isLoading}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </section>
//     </section>
//   );
// }
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import Spinner from "../../spinner/Spinner";

export default function Login() {
  const stateData = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(stateData);
  const [error1, setError1] = useState({});
  const [submit, setSubmit] = useState(false);

  {
    /* <>-------------------------------------</> */
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    setError1(validate(loginData));
    setSubmit(true);
  };

  function validate(val) {
    const err = {};
    if (!val.email) {
      err.email = "Email feild can't be empty";
    }
    if (!val.password) {
      err.password = "Password feild can't be empty";
    }
    return err;
  }

  useEffect(() => {
    if (Object.keys(error1).length == 0 && submit) {
      const userData = {
        email: loginData.email,
        password: loginData.password,
      };
      dispatch(login(userData));
      if (user?.message == "Invalid Credentials") {
        toast.error(user.message);
        navigate("/login");
        dispatch(reset());
        localStorage.removeItem("login");
      } else if (user?.access_token) {
        navigate("/");
        toast.success("Welcome Back", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      dispatch(reset());
    }
  }, [error1]);

  if (isLoading) {
    return <Spinner />;
  }
  console.log(isSuccess, "success");
  console.log(user, "user");
  console.log(isError, "error");
  console.log(user?.access_token, "token");
  return (
    <section className="profile-card m-5 py-5 shadow">
      <section className="h1 text-white mb-4">
        <p>Enter Your Details </p>
      </section>
      <section className="form">
        <form onSubmit={submitHandle} className="form1">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={loginData.email}
              placeholder="Enter your Email"
              onChange={handleChange}
            />
            <p>{error1.email}</p>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={loginData.password}
              placeholder="Enter password"
              onChange={handleChange}
            />
            <p>{error1.password}</p>
          </div>
          <div className="form-group mt-5">
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
