import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
const CUET_PROVIDED_DATA_URL =
  "https://script.google.com/macros/s/AKfycbyDFWeS5kBMDnzY0Rwz6-wFfN_-8uhHCoataOKyapt1RCB3CG9qhK9UUz1VL-2LQwFe/exec";
const AllStudentsList = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tempFilteredData, setTempFilteredData] = useState([]);
  const [marksSorted, setMarksSorted] = useState([]);

  const selectedCategory = (e) => {
    const category = e.target.value;
    if (category === "All") {
      setFilteredData(originalData);
      let arr = [];
      for (let i = 0; i < originalData.length; i++) {
        arr.push(originalData[i]);
      }
      setTempFilteredData(arr);
      console.log("tempFilteredData 1 ->>>", arr);
    } else {
      const filtered = originalData.filter(
        (item) => item.category === category
      );
      setFilteredData(filtered);
      let arr = [];
      for (let i = 0; i < filtered.length; i++) {
        arr.push(filtered[i]);
      }
      setTempFilteredData(arr);
    }
  };

  const marksFilteration = (e) => {
    let marks = e.target.value;
    let filtered = tempFilteredData.filter((item) => item.cuetMarks >= marks);
    setFilteredData(filtered);
  };

  const listSortedByMarks = (e) => {
    let sorted = [];
    for (let i = 300; i >= 0; i--) {
      originalData.map((item) => {
        if (item.cuetMarks == i) {
          sorted.push(item);
        }
      });
    }
    setFilteredData(sorted);
  };
  const sortedByApplication = (e) => {
    let applicationNo = e.target.value;
    if(applicationNo === ""){
      setFilteredData(originalData);
      return;
    }
    let filtered = originalData.filter(
      (item) => "" + item.cuetNo === applicationNo
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(CUET_PROVIDED_DATA_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const result = await response.json();

        setOriginalData(result.data.slice(1));
        setFilteredData(result.data.slice(1));
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard container">
      <Sidebar />
      {isFetching ? <Loader /> : ""}
      <div className="dashboard-content">
        <div className="fixed-filter-section">
          <div className="filter-section">
            <img
              className="icon"
              src="/images/filter_1.png"
              alt="Filter Icon"
            />
            <p>Filter</p>
          </div>
          <div className="serach-application">
            <input
              id="application-number"
              type="text"
              placeholder="Enter Application Number"
              onChange={sortedByApplication}
            />
          </div>
          <div className="or-text">
            <p>OR</p>
          </div>
          <div className="category-filter">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category-select"
              onChange={selectedCategory}
            >
              <option value="All">All</option>
              <option value="General">General</option>
              <option value="EWS">EWS</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="Pwd">Pwd</option>
            </select>
          </div>
          <div className="marks-filter">
            <label htmlFor="marks">Marks:</label>
            <input
              type="text"
              placeholder="Marks"
              onChange={marksFilteration}
            />
          </div>
          <div className="up-arrow" onClick={listSortedByMarks}>
            <img className="icon" src="../../images/up-arrow.png" alt="" />
          </div>
        </div>

        <div className="refresh refresh-data ">
          <span onClick={() => window.location.reload()}>
            <img
              className={`refresh-icon ${isFetching ? "rotate" : ""}`}
              src="../../images/refresh-1.png"
              alt=""
            />
          </span>
        </div>
        <div className="data-show data-show-scroll">
          <table id="table" style={{ marginTop: "20px" }}>
            <thead className="table-head">
              <tr>
                <th className="srno">S.No.</th>
                <th>Name</th>
                <th>Father Name</th>
                <th>Mother Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Category</th>
                <th>Phone No</th>
                <th>Form Number</th>
                <th className="cuet-application-no">CUET Application No</th>
                <th>CUET Marks</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td className="srno">{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.fatherName}</td>
                  <td>{row.motherName}</td>
                  <td>{row.email}</td>
                  <td>{row.dob.split("T")[0]}</td>
                  <td>{row.gender}</td>
                  <td>{row.category}</td>
                  <td>{row.phoneNo}</td>
                  <td>{row.formNo}</td>
                  <td>{row.cuetNo}</td>
                  <td>{row.cuetMarks}</td>
                </tr>
              ))}
            </tbody>
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="15" className="no-data-found">
                  No Data Found
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllStudentsList;
