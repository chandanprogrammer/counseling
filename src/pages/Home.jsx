import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-section">
      <img src="../../images/colg_img.jpg" alt="" />
      <div className="home-text">
        <p>Welcome to GGV Counseling Portal</p>
      </div>
      <button className="btn-home-reg reg1">
        <Link to="/registration">Click for Registration</Link>
      </button>
      <button className="btn-home-reg reg2">
        <Link to="/download-conformation">Download Conformation</Link>
      </button>
    </div>
  );
};

export default Home;
