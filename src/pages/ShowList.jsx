import React, { useState, useEffect } from "react";
const URL_POST_DATA = "https://script.google.com/macros/s/AKfycbyoDilHTM236kcDwvSOPRHeGXDkxKFGCZ4DH-iEwc6g0QoLI0Lsfkpso27sxPJKImGA/exec";

const ShowList = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(URL_POST_DATA);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
      finally {
      setIsFetching(false);
    }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="hero-section">
        <div className="container">
          <p>
            List of <span>MCA</span> Registered Student Counseling Form
            <span> 2025</span>
          </p>
        </div>
      </div>
      <div className="refresh container">
        <span onClick={() => window.location.reload()}>Refresh <img className={`refresh-icon ${isFetching ? "rotate" : ""}`} src="../../images/refresh-1.png" alt="" /></span>
      </div>
      <div className="data-show container">
        <table id="table">
          <thead className="table-head">
            <tr>
              <th className="srno">S.No.</th>
              <th>Name</th>
              <th>Father's Name</th>
              <th>Gender</th>
              <th>Category</th>
              <th>Form Number</th>
              <th>CUET Marks</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {data.slice(1).map((row, index) => (
              <tr key={index}>
                <td className="srno">{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.fatherName}</td>
                <td>{row.gender}</td>
                <td>{row.category}</td>
                <td>{row.formNo}</td>
                <td>{row.cuetMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowList;
