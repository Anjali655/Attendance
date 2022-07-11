import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { useQuery, gql } from "@apollo/client";
import AddEmp from "./AddEmp";

function AdminDashboard() {
  // const [show, setShow] = useState(false);

  const GET_ATTENDANCE = gql`
    query GetTodaysAttendance {
      getTodaysAttendance {
        data {
          employeeName
          attendance
          date
        }
        message
        status
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_ATTENDANCE);

  const [dataCheck, setDataCheck] = useState();

  // useEffect(() => {
  //   if (!data) {
  //     setDataCheck(<h3>NO DATA AVAILABLE</h3>);
  //   }
  // }, [data]);
  console.log(data, "data>>>>>>>>>>>>>>>");
  useEffect(() => {
    console.log(data?.getTodaysAttendance?.data, "data");
    if (data && data?.getTodaysAttendance?.data < 1) {
      setDataCheck(
        <div style={{ float: "right", paddingTop: "10px" }}>
          <b>NO DATA AVAILABLE</b>
        </div>
      );
    }
  }, [data]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return `Error! ${error}`;

  const ADD_EMP = gql`
    mutation Mutation($input: signupInput) {
      empSignup(input: $input) {
        data {
          fullname
          username
          password
        }
      }
    }
  `;

  return (
    <div>
      <div className="welcome-admin">
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Quicksand sans-serif",
            color: "blue",
            fontWeight: "bold",
            boxShadow: "5px 10px 7px rgba(13, 10, 10, 0.1)",
            backgroundColor: "white",
            borderRadius: 30,
          }}
        >
          <b>Welcome Admin</b>
        </h1>
        <img
          src="/admin.jpg"
          style={{ height: "90px", width: "auto", margin: "10px" }}
        ></img>
      </div>

      <img className="dashboardbg" src="/admin-dashboard1.png"></img>

      <div className="outer-box">
        <AddEmp />

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
              {dataCheck}
              {data?.getTodaysAttendance?.data.map((value, index) => (
                <tr key={index}>
                  <td>{value.employeeName}</td>
                  <td>
                    {value.attendance === "present" ? (
                      <div style={{ color: "green", fontSize: 20 }}>
                        <i class="bx bxs-check-circle bx-border bx-tada"></i>
                      </div>
                    ) : (
                      <div style={{ color: "grey" }}>
                        <i class="bx bx-no-entry bx-border"></i>
                      </div>
                    )}
                  </td>
                  <td>{value.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
