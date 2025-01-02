import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header>
        <div className="container header">
          <div className="logo">
            <a href="/">GGV Counseling</a>
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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/registration">Registration</Link>
              </li>
              <li>
                <Link to="/show-registration">Show Registration</Link>
              </li>
            </ul>
            <button className="login">
              <Link to="/login">Login</Link>
            </button>
            {/* <div>
                  <img src="/src/images/hamburge_b.png" alt="" className="hamburge-icon"/>
                </div> */}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
