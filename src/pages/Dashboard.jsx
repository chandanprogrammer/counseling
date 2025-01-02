import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard container">
        <div className="dashboard-sidebar">
          <div className="dashboard-sidebar-heading">
            <img className="home-icon icon" src="../../images/home_1.png" alt="" />
            Dashboard
          </div>
          <ul>
            <li>
            <img className="graduates-icon icon" src="../../images/group.png" alt="" />
              <Link to="/all-students">All Students List</Link>
            </li>
            <li>
            <img className="graduates-icon icon" src="../../images/email.png" alt="" />
              <Link to="/all-students">Send Email</Link>
            </li>
          </ul>
        </div>
        <div className="dashboard-content">Content display here....</div>
      </div>
    </>
  );
};

export default Dashboard;
