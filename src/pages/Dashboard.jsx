import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import Loader from "../components/Loader";

const CUET_PROVIDED_DATA_URL =
  "https://script.google.com/macros/s/AKfycbyDFWeS5kBMDnzY0Rwz6-wFfN_-8uhHCoataOKyapt1RCB3CG9qhK9UUz1VL-2LQwFe/exec";
  const REGISTRED_DATA_URL =
  "https://script.google.com/macros/s/AKfycbyoDilHTM236kcDwvSOPRHeGXDkxKFGCZ4DH-iEwc6g0QoLI0Lsfkpso27sxPJKImGA/exec";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [originalDataCUET, setOriginalDataCUET] = useState([]);
  const [originalDataRegistered, setOriginalDataRegistered] = useState([]);

  useEffect(() => {
    let getLoginDetailsLS = localStorage.getItem("counselingLoginDetails");

    if (getLoginDetailsLS != null) {
      console.log("Dashboard login success...");
    } else {
      console.log("Please login first");
      navigate("/login");
    }
    const fetchDataCUET = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(CUET_PROVIDED_DATA_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const result = await response.json();

        setOriginalDataCUET(result.data.slice(1));
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };
    const fetchDataRegistered = async () => {
      try {
        const response = await fetch(REGISTRED_DATA_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const result = await response.json();

        setOriginalDataRegistered(result.data.slice(1));
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      } finally {
        setIsFetching(false);
      }
    };
    
    fetchDataCUET();
    fetchDataRegistered();
  }, []);

  return (
    <>
      <div className="dashboard container">
        <Sidebar />
        {isFetching ? <Loader /> : ""}
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
                Total Number Of CUET Application : <span>{originalDataCUET.length}</span>
              </p>
              <p>
                Total Number Of Registered Students : <span>{originalDataRegistered.length}</span>
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
