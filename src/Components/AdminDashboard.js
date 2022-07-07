import React, { useState } from "react";
import "./AdminDashboard.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import AddEmp from "./Components/AddEmp";
// const moment = require("moment");

function AdminDashboard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;

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

  // Pass mutation to useMutation
  const [signup, { info, loadings, errors }] = useMutation(ADD_EMP);

  if (loadings) return "Submitting...";
  if (errors) return `Submission error! ${error.message}`;

  const AddEmployee = async () => {
    const addEmp = await signup({
      variables: {
        fullname: "Himanshu Sharma",
        username: "himanshu@codedrill.com",
        password: "himanshu@123",
      },
    });
    return addEmp;
  };

  // console.log(addEmp, "addEmp>>>>>>>>>>>>>>>>>>>>");
    const result = await infos(addEmp).save();
    
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

      <img className="dashboardbg" src="/admin-dashboard1.png"></img>

      <div className="outer-box">
        <Button variant="primary" className="addEmp" onClick={handleShow}>
          Add Employee
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 className="modalTitle">Add new Employee</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label className="modalLabel1">
              <b>Fullname:</b>&nbsp;&nbsp;&nbsp;
              <input className="modalBody" type="text" name="fullname" />
            </label>

            <label className="modalLabel2">
              <b>Username:</b>&nbsp;&nbsp;&nbsp;
              <input className="modalBody" type="email" name="email" />
            </label>

            <label className="modalLabel3">
              <b>Password:</b>&nbsp;&nbsp;&nbsp;
              <input className="modalBody" type="text" name="password" />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

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
              {data?.getTodaysAttendance?.data.map((value, index) => (
                <tr key={index}>
                  <td>{value.employeeName}</td>
                  <td>
                    {value.attendance === "present" ? (
                      <i class="bx bxs-check-circle"></i>
                    ) : (
                      <i class="bx bx-no-entry"></i>
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
