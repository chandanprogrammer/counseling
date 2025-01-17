import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Chart as ChartJS } from "chart.js/auto";
import {
  Doughnut,
  Bar,
  Pie,
  Chart,
  Line,
  PolarArea,
  Radar,
  Scatter,
  Bubble,
} from "react-chartjs-2";
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
  const [categoryCount, setCategoryCount] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    let getLoginDetailsLS = localStorage.getItem("counselingLoginDetails");

    if (getLoginDetailsLS == null) {
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
        calculateNumberOfGender(result.data.slice(1));
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      } finally {
        setIsFetching(false);
      }
    };

    const calculateNumberOfGender = (data) => {
      let categCount = [0, 0, 0, 0, 0, 0];

      for (let i = 0; i < data.length; i++) {
        if (data[i].category === "General") categCount[0]++;
        if (data[i].category === "OBC") categCount[1]++;
        if (data[i].category === "EWS") categCount[2]++;
        if (data[i].category === "SC") categCount[3]++;
        if (data[i].category === "ST") categCount[4]++;
        if (data[i].category === "Pwd") categCount[5]++;
      }
      setCategoryCount(categCount);
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
                Total Number Of CUET Application :{" "}
                <span>{originalDataCUET.length}</span>
              </p>
              <p>
                Total Number Of Registered Students :{" "}
                <span>{originalDataRegistered.length}</span>
              </p>
            </div>
            <div className="chart-gender">
              <Doughnut
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Registered Students Category Count",
                    
                  },
                },
              }}
                data={{
                  labels: ["General", "OBC", "EWS", "SC", "ST", "Pwd"],
                  datasets: [
                    {
                      fill: true,
                      label: "Category",
                      data: categoryCount,
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
