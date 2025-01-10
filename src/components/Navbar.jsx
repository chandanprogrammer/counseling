import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    let loginDetails = localStorage.getItem("counselingLoginDetails");
    setIsLoggedIn(!!loginDetails);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("counselingLoginDetails");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header>
      <div className="container header">
        <div className="logo">
          <a href="/">
            <img src="../../images/ggv_logo.png" alt="Logo" />
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
                  <img
                    className="icon"
                    src="../../images/home.png"
                    alt="Home"
                  />
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
                    alt="Registration"
                  />
                  <p>Registration</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/show-list">
                <div className="flex-center">
                  <img
                    className="icon"
                    src="../../images/list.png"
                    alt="List"
                  />
                  <p>Show List</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/selected-list">
                <div className="flex-center">
                  <img
                    className="icon"
                    src="../../images/selected_list.png"
                    alt="Selected List"
                  />
                  <p>Selected List</p>
                </div>
              </Link>
            </li>
            {!isLoggedIn ? (
              <button className="login-btn">
                <Link to="/login">Login</Link>
              </button>
            ) : (
              <>
                <div className="user-icon-dashboard">
                  <div className="user-icon">
                    <Link to="/dashboard">
                      {" "}
                      <img src="../../images/profile-user.png" alt="" />{" "}
                    </Link>
                  </div>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
