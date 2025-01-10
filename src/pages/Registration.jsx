import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const URL_POST_DATA =
  "https://script.google.com/macros/s/AKfycbysfwC4h4ztvUUnkTjVdLFOvptGEMAKZyctYsuEk2QcBxsMrmL9_O3jHnnrtI7NJ33z/exec";

  const CUET_PROVIDED_DATA_URL =
  "https://script.google.com/macros/s/AKfycbyDFWeS5kBMDnzY0Rwz6-wFfN_-8uhHCoataOKyapt1RCB3CG9qhK9UUz1VL-2LQwFe/exec";

const Registration = () => {
  const [originalData, setOriginalData] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [searchApplicationBox, setSearchApplicationBox] = useState(true);
  const navigate = useNavigate();

  const [applicantName, setApplicantName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [email, setEmail] = useState("");
  const [formNo, setFormNo] = useState("");
  const [cuetNo, setCuetNo] = useState("");
  const [cuetMarks, setCuetMarks] = useState("");
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Waiting for data upload...");

    const form = e.target;
    const marksheet10th = form["marksheet-10th"].files[0];
    const marksheet12th = form["marksheet-12th"].files[0];

    if (!marksheet10th || !marksheet12th) {
      alert("Please upload both 10th and 12th marksheets.");
      return;
    }

    setWaiting(true);

    const formData = new FormData(form);
    const currentDate = new Date();

    const keyValuePairs = Array.from(formData.entries()).map(
      ([key, value]) => `${key}=${value}`
    );
    keyValuePairs.push(`Timestamp=${currentDate.toISOString()}`);

    const formDataString = keyValuePairs.join("&");

    console.log("Waiting for file upload...");
    const readFile = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result.split("base64,")[1];
          resolve({ base64, type: file.type, name: file.name });
        };
        reader.onerror = () =>
          reject(new Error(`Failed to read file: ${file.name}`));
        reader.readAsDataURL(file);
      });

    try {
      const [file1Data, file2Data] = await Promise.all([
        readFile(marksheet10th),
        readFile(marksheet12th),
      ]);

      const payload = {
        files: [file1Data, file2Data],
        data: formDataString,
      };

      const response = await fetch(CUET_PROVIDED_DATA_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      setWaiting(false);
      form.reset();
      console.log("Data uploaded successfully!");

      navigate("/success");
    } catch (error) {
      console.error("Error during file upload:", error);
      setWaiting(false);
    }
  };

  const handleApplicationSearch = () => {
    const applicationNoData = document.getElementById("application-no-data");
    let check = false;

    if (originalData.length === 0) {
      alert("Network Error! Refresh Page and Try Again");
    }
    originalData.map((item, index) => {
      console.log(item);
      
      if (
        "" + item.cuetNo === applicationNoData.value ||
        item.formNo === applicationNoData.value
      ) {
        setSearchApplicationBox(false);
        check = true;
        setApplicantName(item.name);
        setFatherName(item.fatherName);
        setMotherName(item.motherName);
        setEmail(item.email);
        setFormNo(item.formNo);
        setCuetNo(item.cuetNo);
        setCuetMarks(item.cuetMarks);
      }
    });
    if (!check) {
      alert("Invalid Application Number");
      applicationNoData.value = "";
    }    
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL_GET_DATA);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const result = await response.json();

        setOriginalData(result.data.slice(1));
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="hero-section">
        <div className="container">
          <p>
            <span>MCA</span> Counseling Registration Form <span>2025</span>
          </p>
        </div>
      </div>
      <div className=" form-section">
        <form id="form" className="container form" onSubmit={handleFormSubmit}>
          <div className="field not-editable">
            <label className="label">
              Applicant Name <span className="required">*</span>
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter Name"
                name="Name"
                required
                value={applicantName}
              />
            </div>
          </div>
          <div className="field not-editable">
            <label className="label">
              Father's Name <span className="required">*</span>
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter Father's Name"
                name="Father Name"
                required
                value={fatherName}
              />
            </div>
          </div>
          <div className="field not-editable">
            <label className="label">
              Mother's Name <span className="required">*</span>
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter Mother's Name"
                name="Mother Name"
                required
                value={motherName}
              />
            </div>
          </div>

          <div className="field not-editable">
            <label className="label">
              Email ID <span className="required">*</span>
            </label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="example@gmail.com"
                name="Email"
                required
                value={email}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Date of Birth <span className="required">*</span>
            </label>
            <div className="control half-width">
              <input
                className="input"
                type="date"
                placeholder="Your Date of Birth"
                name="DOB"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">
              Gender <span className="required">*</span>
            </label>
            <div className="control gender">
              <label className="radio">
                <input type="radio" name="Gender" value="Male" required /> Male
              </label>
              <label className="radio">
                <input type="radio" name="Gender" value="Female" required />{" "}
                Female
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <select name="Category" id="category" >
                <option value="General">General</option>
                <option value="EWS">EWS</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="Pwd">Pwd</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label className="label">
              Phone Number <span className="required">*</span>
            </label>
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="+91 xxxxxxxxxx"
                name="Phone Number"
                min="1000000000"
                max="9999999999"
                required
              />
            </div>
          </div>

          <div className="field not-editable">
            <label className="label">
              Form Number <span className="required">*</span>
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="GGV/2025/xxxx"
                name="Form Number"
                maxLength="8"
                minLength="8"
                required
                value={formNo}
              />
            </div>
          </div>
          <div className="field not-editable">
            <label className="label">
              CUET Application Number <span className="required">*</span>
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="xxxxxxxxxxx"
                name="CUET Application No"
                maxLength="8"
                minLength="8"
                required
                value={cuetNo}
              />
            </div>
          </div>
          <div className="field not-editable">
            <label className="label">
              CUET Marks <span className="required">*</span>
            </label>
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Enter CUET Marks"
                name="CUET Marks"
                max="300"
                min="0"
                required
                value={cuetMarks}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              10th Marksheet <span className="required">*</span>
            </label>
            <div className="control half-width file">
              <input
                className="input"
                type="file"
                accept=".png, .jpg, .jpeg, .pdf"
                name="marksheet-10th"
                id="marksheet-10th"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              12th Marksheet <span className="required">*</span>
            </label>
            <div className="control half-width file">
              <input
                className="input"
                type="file"
                accept=".png, .jpg, .jpeg, .pdf"
                name="marksheet-12th"
                id="marksheet-12th"
                required
              />
            </div>
          </div>

          <div className="submit-cancel">
            <button className="button is-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      {waiting && (
        <div className="waiting-section" id="waiting-section">
          <div className="loader">
            <img src="../../images/loading.png" alt="Description of image" />
          </div>
          <p>Please wait...</p>
        </div>
      )}
      {searchApplicationBox && (
        <div className="search-application-section">
          <div className="search-application">
            <p>Enter your CUET Application Number</p>
            <input
              id="application-no-data"
              type="text"
              placeholder="CUET Application Number"
            />
            <button onClick={handleApplicationSearch}>Search</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Registration;
