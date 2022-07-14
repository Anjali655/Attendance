import React, { useState, useEffect } from "react";
import "./EmpList.css";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

function EmpList() {
  const [dataCheck, setDataCheck] = useState();
  const navigate = useNavigate();

  const EMP_LIST = gql`
  query getEmpList {
    getEmpList {
      data {
        fullname
        username
        password
      }
      message
      status
    }
  }
    `;

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
          {dataCheck}
          {data?.getEmpList?.data.map((value,index) => (
            <tr key={index}>
              <td>{value.fullname}</td>
              <td>{value.username}</td>
              <td>{value.password}</td>
              
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmpList;
