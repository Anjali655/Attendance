import React, { useState } from "react";
import "./AddEmp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

function AddEmp() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const ADD_EMP = gql`
    mutation Mutation($input: signupInput) {
      empSignup(input: $input) {
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

  const [signup, { data, loading, error }] = useMutation(ADD_EMP);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [mobile, setMobile] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  // localStorage.clear();

  const handleCreate = async () => {
    if (
      fullname !== "" &&
      username !== "" &&
      password !== "" &&
      department !== "" &&
      mobile !== ""
    ) {
      const data = await signup({
        variables: {
          input: {
            fullname: fullname,
            username: username,
            password: password,
            department: department,
            mobile: mobile,
          },
        },
      });
      const success = data?.data?.empSignup?.message;
      alert(success);
      console.log(data, "data >>>>>>>>>>>>>>>>>>");
      setShow(false);
      navigate("/admin-dash");
    }
  };

  // const success = data?.data?.empSignup;
  // console.log(data?.data?.empSignup);
  // if (data?.data?.empSignup?.status === 200) {
  //    localStorage.clear();
  //   const success = data?.data?.empSignup?.message;
  //   console.log(success);
  //   alert(success);
  // } else {
  //   const error = data?.data?.empSignup?.message;
  //   console.log(error);
  //   alert(error);
  // }

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <>
      <div variant="primary" onClick={handleShow} className="classify">
        <i class="bx bx-cart-add"></i> Add Employee
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="modalTitle">Add New Employee</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="modalLabel1">
            <b>Fullname:</b>&nbsp;&nbsp;&nbsp;
            <input
              className="modalBody"
              type="text"
              name="fullname"
              placeholder="Full name"
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />
          </label>

          <label className="modalLabel2">
            <b>Username:</b>&nbsp;&nbsp;&nbsp;
            <input
              className="modalBody"
              type="email"
              name="username"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>

          <label className="modalLabel3">
            <b>Password:</b>&nbsp;&nbsp;&nbsp;
            <input
              className="modalBody"
              type="text"
              name="password"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>

          <label className="modalLabel4">
            <b>Department:</b>&nbsp;&nbsp;&nbsp;
            <input
              className="modalBody"
              type="text"
              name="department"
              placeholder="Enter Department"
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            />
          </label>

          <label className="modalLabel5">
            <b>Mobile no:</b>&nbsp;&nbsp;&nbsp;
            <input
              className="modalBody"
              type="text"
              name="mobile"
              placeholder="Enter mobile no."
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AddEmp;
