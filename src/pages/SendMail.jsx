import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const URL_POST_DATA =
  "https://script.google.com/macros/s/AKfycbyoDilHTM236kcDwvSOPRHeGXDkxKFGCZ4DH-iEwc6g0QoLI0Lsfkpso27sxPJKImGA/exec";

const SendMail = () => {
  const [originalData, setOriginalData] = useState([]);
  
  useEffect(() => {
    const btn = document.querySelector(".send-mail");

    const fetchData = async () => {
      try {
        const response = await fetch(URL_POST_DATA);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const result = await response.json();
        console.log(result.data);

        setOriginalData(result.data.slice(1));
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };
    fetchData();

    const handleClick = async () => {
      try {
        // if (originalData.length === 0) {
        //   alert("Network Error! Try Again");
        //   fetchData();
        //   return;
        // }
        console.log(originalData);
        
        for (let i = 0; i < originalData.length; i++) {
          console.log(`${i+1} Email sent successfully!`);

          const { email, name, formNo, cuetNo } = originalData[i];
          if (!email || !email.includes("@")) {
            console.error(`Invalid email for entry ${i}: ${email}`);
            continue;
          }
          const response = await fetch("http://localhost:8000/send-mail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: `${email}`,
              subject: "Admission Confirmation and Counseling Details",
              html: `
                  <h3>Dear ${name}</h3>,

                  Congratulations! We are delighted to inform you that you have been selected for admission to the MCA program at Guru Ghasidas Vishwavidyalaya (GGV).

                  To complete the admission process, please attend the counseling session scheduled for 12-02-2025 at 10:00 AM, held at the CSIT department. Kindly bring all the required documents for verification as mentioned in the admission guidelines. Please also ensure you have your form number (${formNo}) and CUET number (${cuetNo}) ready for reference.
                  <br/>
                  <br/>
                  <b>Warm regards</b>,  
                  CSIT Department  <br/>
                  Guru Ghasidas Vishwavidyalaya `,
            }),
          });
          const result = await response.json();
          console.log("Email sent successfully!", result);
        }
      } catch (error) {
        console.log("Failed to send email.", error);
      }
    };
    if (btn) {
      btn.addEventListener("click", handleClick);
    }
    return () => {
      if (btn) {
        btn.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <>
      <div className="dashboard container">
        <Sidebar />
        <div className="dashboard-content">
          <button className="send-mail">Click</button>
        </div>
      </div>
    </>
  );
};

export default SendMail;
