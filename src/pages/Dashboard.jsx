import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Bar, Pie } from "react-chartjs-2";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);

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
          <div className="refresh container">
            <span onClick={() => window.location.reload()}>
              Refresh{" "}
              <img
                className={`refresh-icon ${isFetching ? "rotate" : ""}`}
                src="../../images/refresh-1.png"
                alt=""
              />
            </span>
          </div>
          <div className="chart-section">
            <div className="count-student">
              <p>
                Total Number Of Students (All): <span>88</span>
              </p>
              <p>
                Total Number Of Registered Students : <span>78</span>
              </p>
            </div>
            <div className="chart-gender">
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
      </div>
    </>
  );
};

export default Dashboard;
