import React, { useState, useEffect } from "react";
import "./EmpList.css";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

function EmpList() {
  return (
    <div className="outerCover">
      {/* <div className="emplistbg">
        <img />
      </div> */}

      <div className="innerCover">
        <div className="emp_name">Employee Listing</div>
        <table className="table table-hover">
          <thead className="table-success">
            <tr>
              <th>Employee name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Mobile no.</th>
            </tr>
          </thead>
          <tbody className="table-light">
            <tr>
              <td>Anjali</td>
              <td>Mern Stack</td>
              <td>anjali@codedrill.com</td>
              <td>7986085268</td>
            </tr>
            <tr>
              <td>Ankush</td>
              <td>Mern Stack</td>
              <td>ankush@codedrill.com</td>
              <td>9763273428</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmpList;
