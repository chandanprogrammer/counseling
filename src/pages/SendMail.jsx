import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";

const SendMail = () => {
  useEffect(() => {
    const btn = document.querySelector(".send-mail");

    const handleClick = async () => {
      try {
        const response = await fetch("http://localhost:8000/send-mail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: "chandankumar070503@gmail.com",
            subject: "Hello",
            html: "<h1>Hello Ji</h1>",
          }),
        });

        const result = await response.json();
        console.log(result);
        console.log("Email sent successfully!");
      } catch (error) {
        console.error(error);
        console.log("Failed to send email.");
      }
    };

    if (btn) {
      btn.addEventListener("click", handleClick);
    }

    // Cleanup event listener on component 
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
