import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user, "qqqqqqqqqqqqq");
  return (
    <div className="profile-card ms-2">
      <div className="profile-card mt-3">
        <h1 className="card-title pt-2 ms-3">
          Welcome {user ? <>{user.user.name}</> : null}!
        </h1>
        {/* <div>name:{user ? <>{user.user.name}</> : null}</div> */}
        <div className="card-body">
          <div>email: {user ? <>{user.user.email}</> : null}</div>
          <div>Employee Id: {user ? <>{user.user.emp_id}</> : null}</div>
          <div>Phone Number: {user ? <>{user.user.phone_number}</> : null}</div>
          <div>Dashboard</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
