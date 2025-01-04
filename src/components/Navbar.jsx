import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Login details access from local storage
  let getLoginDetailsLS = localStorage.getItem("counselingLoginDetails");

  let logoutBtn = document.querySelector(".logout-btn");
  let loginBtn = document.querySelector(".login-btn");

  // console.log(loginBtn, logoutBtn);
  
  
  if (getLoginDetailsLS != null) {
    // loginBtn.style.display = "none";
    // logoutBtn.style.display = "block";
  } else {
    // loginBtn.style.display = "block";
    // logoutBtn.style.display = "none";
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header>
        <div className="container header">
          <div className="logo">
            <a href="/">
              <img src="../../images/ggv_logo.png" alt="" />
              <p>GGV</p>
            </a>
          </div>
          <nav>
            <div className="hamburger" onClick={toggleMenu}>
              <img
                src="../../images/hamburge_b.png"
                alt="Menu"
                className="hamburge-icon"
              />
            </div>
            <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
              <li>
                <Link to="/">
                  <div className="flex-center">
                    <img className="icon" src="../../images/home.png" alt="" />
                    <p>Home</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/registration">
                  <div className="flex-center">
                    <img
                      className="icon"
                      src="../../images/registration.png"
                      alt=""
                    />
                    <p>Registration</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/show-list">
                  {" "}
                  <div className="flex-center">
                    <img className="icon" src="../../images/list.png" alt="" />
                    <p>Show List</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/selected-list">
                  {" "}
                  <div className="flex-center">
                    <img
                      className="icon"
                      src="../../images/selected_list.png"
                      alt=""
                    />
                    <p>Selected List</p>
                  </div>
                </Link>
              </li>
              <button className="login-btn">
                <Link to="/login">Login</Link>
              </button>
              <button
                className="logout-btn"
                onClick={() => {
                  // Login details access from local storage
                  let getLoginDetailsLS = localStorage.getItem(
                    "counselingLoginDetails"
                  );

                  if (getLoginDetailsLS != null) {
                    localStorage.removeItem("counselingLoginDetails");
                    navigate("/login");
                  }
                }}
              >
                Logout
              </button>
            </ul>
            {/* <div className="user-profile"></div> */}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
