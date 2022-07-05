import React, { useState, useEffect } from "react";
import "./EmpDashboard.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
const moment = require("moment");

function EmpDashboard() {
  const [show, setShow] = useState(false);
  const [goback, setGOBack] = useState(false);
  const navigate = useNavigate();
  const handleShow = () => {
    setShow(!show);
    setTimeout(setGOBack(true), 3000);
  };

  React.useEffect(() => {
    if (goback) {
      setShow(!show);
      navigate("/");
    }
  }, [goback]);

  const SET_ATTENDANCE = gql`
    mutation MarkAttendance {
      markAttendance {
        data
        message
        status
      }
    }
  `;
  const [attendance, { loading, error, data }] = useMutation(SET_ATTENDANCE);

  const markAttendance = async () => {
    const attendancedata = await attendance({
      variables: {},
    }); 

    if (attendancedata?.data?.markAttendance?.status === 200) {
      setShow(!show);
    } else {
      console.log("some error occured...");
    }

    console.log(attendancedata, "attendance");
  };

  return (
    <div>
      <div className="welcome">
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Quicksand sans-serif",
            color: "rgb(255, 165, 8)",
          }}
        >
          <b>Welcome Ankush</b>
        </h1>
        <img
          src="/admin.jpg"
          style={{ height: "90px", width: "auto", margin: "10px" }}
        ></img>
      </div>

      <img className="dashboard-corner" src="/dashboard-corner.png"></img>

      <div className="first-wrapper">
        {/* MODAL POPUP */}
        <Modal show={show} onHide={handleShow}>
          <Modal.Body>
            <span onClick={handleShow}>X</span> &nbsp;&nbsp;&nbsp;&nbsp;
            <span>
              Your Attendance is marked & you will be redirected to Login page
            </span>
          </Modal.Body>
        </Modal>
        {/* MODAL POPUP END */}
        <div className="wrapper">
          <div>
            <button className="bn632-hover bn22" onClick={markAttendance}>
              <b style={{ color: "rgb(255, 165, 8)" }}>I am Present</b>
            </button>
          </div>
          <div className="date">
            <p>
              <b>Date:{moment().format("LL")}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpDashboard;
