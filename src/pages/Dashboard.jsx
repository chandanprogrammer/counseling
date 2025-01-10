import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Bar, Pie } from "react-chartjs-2";

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
          <div
            className="chart-gender"
            style={{ backgroundColor: "#fff", width: "300px", height: "300px", padding: "1rem" }}
          >
            <Pie
              data={{
                labels: ["General", "OBC", "EWS", "SC", "ST", "Pwd"],
                datasets: [
                  {
                    label: "General",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
