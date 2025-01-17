import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom'

const URL_POST_DATA =
  "https://script.google.com/macros/s/AKfycbwGEMmyaUeDytA_Rh4xzjha-eNLwudXxVzNnaL6myQAPATAzXWxFs33iAV3XwdTx2LV/exec";

const Login = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Login details access from local storage
    let getLoginDetailsLS = localStorage.getItem("counselingLoginDetails");

    if (getLoginDetailsLS != null) {
      if (getLoginDetailsLS.length >= 1) {
        navigate("/dashboard");
        return;
      }
    }

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
    // console.log(data, data.length);
    if (data.length === 0) {
      alert("Network Error! Try Again");
      fetchData();
      return;
    }
    const email = document.getElementById("email");
    let emailValue = email.value;
    const password = document.getElementById("password");
    let passwordValue = password.value;

    // console.log("data1", data);

    let encyriptPass = "";
    let rev = passwordValue.split("").reverse();
    let other = ["7", "e", "8", "t", "s", "#", "&", "$", "a", "b"];
    for (let i = 0; i < rev.length; i++) {
      encyriptPass += other[i] + rev[i];
    }

    passwordValue = encyriptPass;

    const currentDate = new Date();
    for (let i = 1; i < data.length; i++) {
      if (data[i].email === emailValue && data[i].password === passwordValue) {
        //  Save login details in Local storage
        let setLoginDetailsLS = [
          {
            email: emailValue,
            password: passwordValue,
            loginDate: currentDate.toISOString().split("T")[0],
          },
        ];
        localStorage.setItem(
          "counselingLoginDetails",
          JSON.stringify(setLoginDetailsLS)
        );

        navigate("/dashboard");
        window.location.reload();
        return;
      }
    }
    alert("Invalid Email or Password! Try Again");
    email.value = "";
    password.value = "";
  };

  return (
    <div className="container">
      <div>
        <h2 className="login-heading">Admin Login</h2>
      </div>
      <div className="login-section flex-center">
        <form className="login-form" onSubmit={passwordCheck}>
          <div className="form-group">
            <label htmlFor="email">Email </label>
            <img className=" email-icon" src="../../images/email.png" alt="" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <img
              className=" padlock-icon"
              src="../../images/padlock.png"
              alt=""
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <button id="submit-login" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
