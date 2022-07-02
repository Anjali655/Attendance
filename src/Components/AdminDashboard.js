import React from "react";
import "./AdminDashboard.css";
const moment = require("moment");

function AdminDashboard() {
  return (
    <div>
      <div className="welcome-admin">
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Quicksand sans-serif",
            color: "blue",
          }}
        >
          Welcome Admin
        </h1>
        <img
          src="/admin.jpg"
          style={{ height: "90px", width: "auto", margin: "10px" }}
        ></img>
      </div>

      <img className="dashboardbg" src="/admin-dashboardbg.jpg"></img>

      <div className="outer-box">
        <div className="inner-box">
          <table className="table table-hover">
            <thead className="table-primary">
              <tr>
                <th>Username</th>
                <th>Present</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody className="table-light">
              <tr>
                <td>Anjali Dogra</td>
                <td>
                  <i class="bx bxs-check-circle"></i>
                </td>
                <td>{moment().format("MMMM Do YYYY, h:mm:ss a")}</td>
              </tr>
              <tr>
                <td>Ankush Gautam</td>
                <td>
                  <i class="bx bx-no-entry"></i>
                </td>
                <td>{moment().format("MMMM Do YYYY, h:mm:ss a")}</td>
              </tr>
              <tr>
                <td>Ravi Pathak</td>
                <td>
                  <i class="bx bxs-check-circle"></i>
                </td>
                <td>{moment().format("MMMM Do YYYY, h:mm:ss a")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
