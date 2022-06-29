import React from "react";
import "./EmpDashboard.css";

function EmpDashboard() {
  return (
    <div>
      <div className="welcome">
        <h1>
          <b>Welcome Ankush</b>
        </h1>
        <img
          src="/admin.jpg"
          style={{ height: "90px", width: "auto", margin: "10px" }}
        ></img>
      </div>

      <div className="first-wrapper">
        <div className="wrapper">
          
          <a href="/"><button class="bn632-hover bn22"><b>I am Present</b></button></a>
          
          <div className="date">
            <p><b>Date:</b></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpDashboard;
