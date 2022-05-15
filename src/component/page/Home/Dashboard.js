import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // console.log(user.user.name);
  useEffect(() => {
    if (!user) {
      navigate("/question");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user ? <>{user.user.name}</> : null}</h1>
        {/* <div>name:{user ? <>{user.user.name}</> : null}</div> */}
        <div>email:{user ? <>{user.user.email}</> : null}</div>
        <div>Employee Id:{user ? <>{user.user.emp_id}</> : null}</div>
        <div>Phone Number:{user ? <>{user.user.phone_number}</> : null}</div>
        <div>Dashboard</div>
      </section>
    </>
  );
}
