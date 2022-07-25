import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import AddEmp from "./AddEmp";
import EmpList from "./EmpList";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function AdminDashboard() {
  // const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const navigate = useNavigate();

  const GET_ATTENDANCE = gql`
    query GetTodaysAttendance {
      getTodaysAttendance {
        data {
          employeeName
          attendance
          signIn
          signOut
        }
        message
        status
      }
    }
  `;

  const GET_ATTENDANCE_BY_DATE = gql`
    query ExampleQuery($input: dataInput) {
      getAnyAttendance(input: $input) {
        data {
          employeeName
          attendance
          signIn
          signOut
        }
        message
        status
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_ATTENDANCE);
  const [ddata, { loading1, error1 }] = useLazyQuery(GET_ATTENDANCE_BY_DATE);

  const [dataCheck, setDataCheck] = useState("");

  function logout() {
    localStorage.clear();
    // localStorage.removeItem("token");
    navigate("/admin");
  }

  const empList = () => {
    console.log("div clicked");
    navigate("/emp-list");
  };

  const [searchData, setSearchData] = useState();

  const handleAnyDate = async () => {
    const yyyy = startDate.getFullYear();
    let mm = startDate.getMonth() + 1; // Months start at 0!
    let dd = startDate.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;

    const search = await ddata({
      variables: {
        input: {
          date: formattedToday,
        },
      },
    });

    setSearchData(search?.data?.getAnyAttendance?.data);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;

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
        {/* <EmpList /> */}

        <div className="logOut" onClick={logout}>
          <i class="bx bx-log-out"></i> Log Out
        </div>

        <div className="emplist" onClick={empList}>
          <i class="bx bx-list-ol"></i> Employee List
        </div>

        <div className="inner-box">
          <div className="displayDates">
            <div className="calendar">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="searchBtn" onClick={handleAnyDate}>
              Search
            </div>
          </div>

          <table className="table table-hover">
            <thead className="table-primary">
              <tr>
                <th>Username</th>
                <th>Present</th>
                <th>SignIn</th>
                <th>SignOut</th>
              </tr>
            </thead>

            <tbody className="table-light">
              {dataCheck}
              {searchData ? (
                searchData.length === 0 ? (
                  <h4
                    style={{
                      marginTop: "10px",
                      marginLeft: "200px",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <b>No Data Found</b>
                  </h4>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {searchData
                ? searchData !== null || searchData !== undefined
                  ? searchData.map((value, index) => (
                      <tr key={index}>
                        <td>{value.employeeName}</td>
                        <td>
                          {value.attendance === "present" ? (
                            <div style={{ color: "green", fontSize: 20 }}>
                              <i class="bx bxs-check-circle bx-border bx-tada"></i>
                            </div>
                          ) : (
                            <div style={{ color: "grey" }}>
                              <i class="bx bx-no-entry bx-border bx-tada"></i>
                            </div>
                          )}
                        </td>
                        <td>{value.signIn}</td>
                        <td>{value.signOut}</td>
                      </tr>
                    ))
                  : ""
                : data !== null || data !== undefined
                ? data?.getTodaysAttendance?.data.length > 0
                  ? data?.getTodaysAttendance?.data.map((value, index) => (
                      <tr key={index}>
                        <td>{value.employeeName}</td>
                        <td>
                          {value.attendance === "present" ? (
                            <div style={{ color: "green", fontSize: 20 }}>
                              <i class="bx bxs-check-circle bx-border bx-tada"></i>
                            </div>
                          ) : (
                            <div style={{ color: "grey" }}>
                              <i class="bx bx-no-entry bx-border bx-tada"></i>
                            </div>
                          )}
                        </td>
                        <td>{value.signIn}</td>
                        <td>{value.signOut}</td>
                      </tr>
                    ))
                  : "No Data Found..."
                : "No Data Found..."}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
