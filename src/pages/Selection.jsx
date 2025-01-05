import React from "react";
import Sidebar from "../components/Sidebar";

const Selection = () => {
  return (
    <>
      <div className="dashboard container">
        <Sidebar />
        <div className="dashboard-content selection-section">
          <div className="selection-round selection-round-1">
            <h2>Selection for Round 1</h2>
            <div className="categ-perct-all">
                <div className="categ-perct">
                    <label htmlFor="">General : </label>
                    <input type="number" placeholder="%"/>
                </div>
                <div className="categ-perct">
                    <label htmlFor="">EWS :</label>
                    <input type="number" placeholder="%"/>
                </div>
                <div className="categ-perct">
                    <label htmlFor="">OBC :</label>
                    <input type="number" placeholder="%"/>
                </div>
                <div className="categ-perct">
                    <label htmlFor="">SC :</label>
                    <input type="number" placeholder="%"/>
                </div>
                <div className="categ-perct">
                    <label htmlFor="">ST :</label>
                    <input type="number" placeholder="%"/>
                </div>
                <div className="categ-perct">
                    <label htmlFor="">Pwd :</label>
                    <input type="number" placeholder="%"/>
                </div>
                <div>Get List</div>
                <div>Send Email</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Selection;
