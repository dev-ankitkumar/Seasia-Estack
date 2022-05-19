import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // console.log(user.user.name);
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/question");
  //   }
  // }, [user, navigate]);

  console.log(user, "qqqqqqqqqqqqq");

  return (
    <>
      <section className="dashboard-design">
        <div>SEASIA ESTACK</div>
      </section>
    </>
  );
}
