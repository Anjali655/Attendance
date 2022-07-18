import React, { useState, useEffect } from "react";
import "./EmpList.css";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

function EmpList() {
  const [dataCheck, setDataCheck] = useState();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const EMP_LIST = gql`
    query getEmpList {
      getEmpList {
        data {
          fullname
          username
          password
          department
          mobile
        }
        message
        status
      }
    }
  `;

  function backToDashboard() {
    navigate("/admin-dash");
  }

  const { data, loading, error } = useQuery(EMP_LIST);

  useEffect(() => {
    console.log(data?.getEmpList, "data");
    if (data && data?.getEmpList?.data < 1) {
      setDataCheck(
        <div style={{ float: "right", paddingTop: "10px" }}>
          <b>NO DATA AVAILABLE</b>
        </div>
      );
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;

  return (
    <div className="outerCover">
      <div className="innerCover">
        {/* 
        <div variant="primary" onClick={handleShow} className="emplist">
         <i class='bx bx-list-ol'></i>  Employee List
        </div> */}

        <div className="emp_name">
          Employee Listing <i class="bx bx-list-check"></i>
        </div>
        <table className="table table-hover">
          <thead className="table-success">
            <tr>
              <th>Fullname</th>
              <th>Email</th>
              <th>Password</th>
              <th>Department</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody className="table-light">
            {dataCheck}
            {data?.getEmpList?.data.map((value, index) => (
              <tr key={index}>
                <td>{value.fullname}</td>
                <td>{value.username}</td>
                <td>{value.password}</td>
                <td>{value.department}</td>
                <td>{value.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="back-btn" onClick={backToDashboard}>
        <i class="bx bx-log-out-circle"></i> Back
      </div>
    </div>
  );
}

export default EmpList;
