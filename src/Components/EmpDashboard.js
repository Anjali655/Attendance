import React, { useState, useRef, useEffect } from "react";
import "./EmpDashboard.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
const moment = require("moment");

function EmpDashboard() {
  const [show, setShow] = useState(false);
  const [goback, setGOBack] = useState(false);
  const [msg, setMsg] = useState();
  const modalClose = () => {
    setShow(false);
    navigate("/");
  };

  const navigate = useNavigate();
  const handleShow = () => {
    setShow(!show);
    // setTimeout(setGOBack(true), 1000);
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

  const Ref = useRef(null);
  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    // console.log(e, "events>>>>>>>>");
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      navigate("/");
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:00:10");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  const [attendance, { loading, error, data }] = useMutation(SET_ATTENDANCE);

  const markAttendance = async () => {
    const attendancedata = await attendance({
      variables: {},
    });

    // console.log(
    //   attendancedata,
    //   "attendancedata>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    // );

    if (attendancedata?.data?.markAttendance?.status === 200) {
      setShow(!show);
      setMsg(
        "Your Attendance is marked & you will be redirected to Login page in..."
      );
    } else if (
      attendancedata?.data?.markAttendance?.message ===
      "Already taken attendance"
    ) {
      setMsg(
        "Your Attendance is already marked & you will be redirected to Login page in..."
      );
      setShow(!show);
    } else {
      console.log("some error occured...");
      // return "Your Attendance is already marked";
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
          <b>Welcome User</b>
        </h1>
        <img
          src="/admin.jpg"
          style={{ height: "90px", width: "auto", margin: "10px" }}
        ></img>
      </div>

      <img className="dashboard-corner" src="/dashboard-corner.png"></img>

      <div className="first-wrapper">
        {/* MODAL POPUP */}
        <Modal
          show={show}
          onHide={handleShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Title>
            <h3 className="modalStyle">
              <b>Attendance</b>
            </h3>
          </Modal.Title>
          <Modal.Body>
            {/* <span onClick={handleShow}>X</span> &nbsp;&nbsp;&nbsp;&nbsp; */}
            <span>
              {/* Your Attendance is marked & you will be redirected to Login page */}
              {msg} <b>{timer}</b>
              {/* <div> */}
              {/* <h2>{timer}</h2> */}
              {/* <button onClick={onClickReset}>Reset</button> */}
              {/* </div> */}
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-info" onClick={modalClose}>
              Close
            </Button>
          </Modal.Footer>
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
              <b>Date:{moment().format("llll")}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpDashboard;
