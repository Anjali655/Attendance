import React from "react";
import "./EmpDashboard.css";
const moment = require("moment");

function EmpDashboard() {

  return (
    <div>
      <div className="welcome">
        <h1 style={{
          textAlign:'center',
          fontFamily: 'Quicksand sans-serif',
          color:"rgb(255, 165, 8)",
          }}>
          <b>Welcome Ankush</b>
        </h1>
        <img
          src="/admin.jpg"
          style={{ height: "90px", width: "auto", margin: "10px" }}
        ></img>
      </div>

      <img className="dashboard-corner" src="/dashboard-corner.png"></img>

      <div className="first-wrapper">
        <div className="wrapper">
          <div>
            <a href="/">
              <button className="bn632-hover bn22">
                <b style={{color:"rgb(255, 165, 8)"}}>I am Present</b>
              </button>
            </a>
          </div>
          <div className="date">
            <p>
              <b>Date:{moment().format('LL')}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpDashboard;
