import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // console.log(user.user.name);
  useEffect(() => {
    if (!user) {
      navigate("/question");
    }
  }, [user, navigate]);

  console.log(user, "qqqqqqqqqqqqq");

  return (
    <>
      <section className="heading text-start">
        <div className="profile-card mt-3">
        <h1 className='card-title pt-2 ms-3' >Welcome {user ? <>{user.user.name}</> : null}!</h1>
        {/* <div>name:{user ? <>{user.user.name}</> : null}</div> */}
        <div className="card-body">
        <div>email: {user ? <>{user.user.email}</> : null}</div>
        <div>Employee Id: {user ? <>{user.user.emp_id}</> : null}</div>
        <div>Phone Number: {user ? <>{user.user.phone_number}</> : null}</div>
        <div>Dashboard</div>
        </div>
        </div>
      </section>
    </>
  );
}
