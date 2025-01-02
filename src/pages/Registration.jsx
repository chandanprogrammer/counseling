import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [waiting, setWaiting] = useState(false);
  const navigate = useNavigate();

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

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxPVZdMohRRYEzKHL-eByxnKgEcSetthJGC5pyy-LmxT9wjdIyKcBTRZVf6MTMSLmyg9g/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }
      );

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
          <div className="field">
            <label className="label">Applicant Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter Name"
                name="Name"
                // required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Father's Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter Father's Name"
                name="Father Name"
                // required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Mother's Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter Mother's Name"
                name="Mother Name"
                // required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email ID</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="example@gmail.com"
                name="Email"
                // required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Date of Birth</label>
            <div className="control half-width">
              <input
                className="input"
                type="date"
                placeholder="Your Date of Birth"
                name="DOB"
                // required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Gender</label>
            <div className="control gender">
              <label className="radio">
                <input type="radio" name="Gender" value="male" /*required */ />{" "}
                Male
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="Gender"
                  value="female" /*required */
                />{" "}
                Female
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <select name="Category" id="category">
                <option value="general">General</option>
                <option value="obc">OBC</option>
                <option value="sc">SC</option>
                <option value="st">ST</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label className="label">Phone Number</label>
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="+91 xxxxxxxxxx"
                name="Phone Number"
                // required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Form Number</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="GGV/2025/xxxx"
                name="Form Number"
                // required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">CUET Application Number</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="xxxxxxxxxxx"
                name="CUET Application No"
                // required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">CUET Marks</label>
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Enter CUET Marks"
                name="CUET Marks"
                // required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">10th Marksheet</label>
            <div className="control half-width file">
              <input
                className="input"
                type="file"
                accept=".png, .jpg, .jpeg, .pdf"
                name="marksheet-10th"
                id="marksheet-10th"
                // required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">12th Marksheet</label>
            <div className="control half-width file">
              <input
                className="input"
                type="file"
                accept=".png, .jpg, .jpeg, .pdf"
                name="marksheet-12th"
                id="marksheet-12th"
                // required
              />
            </div>
          </div>

          <div className="submit-cancel">
            <button className="button is-primary" type="submit">
              Submit
            </button>
            {/* <button className="button is-danger" type="button">
              Cancel
            </button> */}
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
    </>
  );
};

export default Registration;
