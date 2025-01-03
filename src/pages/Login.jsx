import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom'

const URL_POST_DATA =
  "https://script.google.com/macros/s/AKfycbyoDilHTM236kcDwvSOPRHeGXDkxKFGCZ4DH-iEwc6g0QoLI0Lsfkpso27sxPJKImGA/exec";

const Login = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  const passwordCheck = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    

    if (email === "admin" && password === "admin") {
      // console.log("Success");
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
      // email.value = "";
      // password.value = "";
    }
  };

  return (
    <div className="container">
      <div>
        <h2 className="login-heading">Login</h2>
      </div>
      <div className="login-section flex-center">
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Username or Email </label>
            <input type="text" id="email" name="email" placeholder="Username or Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" required />
          </div>
          <button id="submit-login" type="submit" onClick={passwordCheck}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
