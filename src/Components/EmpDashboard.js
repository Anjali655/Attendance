import React, { useState, useRef, useEffect } from "react";
import "./EmpDashboard.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { gql, useMutation, useQuery } from "@apollo/client";
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

  useEffect(() => {
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

  const SET_SIGNOUT = gql`
    mutation Signout {
      signout {
        data
        message
        status
      }
    }
  `;

  const CHECK_ATTENDANCE = gql`
    query CheckLogin {
      checkLogin {
        data
        message
        status
      }
    }
  `;

  const [already, setAlready] = useState(false);

  const [attendance, { loading1, error1, data1 }] = useMutation(SET_ATTENDANCE);
  const [signout, { loading2, error2, data2 }] = useMutation(SET_SIGNOUT);

  const { data, loading, error } = useQuery(CHECK_ATTENDANCE);

  console.log(data, "data????data??????data");

  useEffect(() => {
    setAlready(data);
  }, [data, loading, error]);

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
      setMsg("Your Attendance is marked");
    } else if (
      attendancedata?.data?.markAttendance?.message ===
      "Already taken attendance"
    ) {
      setMsg("Your Attendance is already marked");
      setShow(!show);
    } else {
      console.log("some error occured...");
      // return "Your Attendance is already marked";
    }

    console.log(attendancedata, "attendance");
  };

  const signedout = async () => {
    const signoutdata = await signout({
      variables: {},
    });
    alert(signoutdata?.data?.signout?.data);
    localStorage.clear();
    navigate("/");
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
          size="md"
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
            <span style={{ marginLeft: "130px" }}>
              {/* Your Attendance is marked & you will be redirected to Login page */}
              {msg}
              {/* <b>{timer}</b> */}
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
            {loading ? (
              "Please Wait ..."
            ) : already?.checkLogin?.status === 201 ? (
              <button className="bn632-hover bn22" onClick={markAttendance}>
                <b style={{ color: "rgb(255, 165, 8)" }}>I am Present</b>
              </button>
            ) : (
              <button className="bn632-hover bn22" onClick={signedout}>
                <b style={{ color: "rgb(255, 165, 8)" }}>Sign Me Out</b>
              </button>
            )}
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
