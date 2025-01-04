import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let getLoginDetailsLS = localStorage.getItem("counselingLoginDetails");

    if (getLoginDetailsLS != null) {
      console.log("Dashboard login success...");
    } else {
      console.log("Please login first");
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="dashboard container">
        <Sidebar />
        <div className="dashboard-content">
          Main dashboard content
        </div>
      </div>
    </>
  );
};

export default Dashboard;
