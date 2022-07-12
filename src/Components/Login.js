import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useLazyQuery, gql } from "@apollo/client";

<script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js"></script>;
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
  crossorigin="anonymous"
></script>;

function Login() {
  const [eye, setEye] = useState(false);
  const [defaulteye, setSefaulteye] = useState("far fa-eye");
  const [inputType, setInputType] = useState("password");

  const GET_LOGIN = gql`
    query ExampleQuery($input: loginInput) {
      empLogin(input: $input) {
        message
        data {
          token
        }
        status
      }
    }
  `;

  function ShowAndHidePassword() {
    if (eye === false) {
      setEye(true);
      setSefaulteye("far fa-eye-slash");
      setInputType("text");
    } else {
      setEye(false);
      setSefaulteye("far fa-eye");
      setInputType("password");
    }
  }

  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();

  // const [loginCheck, { loading, error, data }] = useQuery(GET_LOGIN);
  const [data, { loading, error }] = useLazyQuery(GET_LOGIN);
  const [emailError, setEmailErr] = useState("");
  const [pwdError, setPwdErr] = useState("");

  const [apiErr, setApiErr] = useState("");
  localStorage.clear();

  async function handleClickEvent() {
    if (email && pwd) {
      const loginData = await data({
        variables: {
          input: {
            username: email,
            password: pwd,
          },
        },
      });

      // console.log(loginData);
      console.log(loginData?.data);

      if (loginData?.data?.empLogin?.status === 200) {
        localStorage.clear();
        localStorage.setItem("token", loginData?.data?.empLogin?.data?.token);
        navigate("/emp-dash");
      } else {
        const error = loginData?.data?.empLogin?.message;
        // setApiErr(loginData?.data?.empLogin?.message);
        alert(error);
      }
    } else {
      alert("Please enter login email and valid password");
      // email ? setEmailErr("") : setEmailErr("Please enter login email");
      // pwd ? setPwdErr("") : setPwdErr("Please enter valid password");
    }
  }

  const navigate = useNavigate();
  const navigateToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="outer-wrapper">
      {/* <div className="classifybtn">
        <button className="btn btn-primary btn-md" onClick={navigateToAdmin}>
          Admin Login
        </button>
      </div> */}
      .
      <div variant="primary" className="classifybtn" onClick={navigateToAdmin}>
        Admin Login
      </div>
      <div className="form-wrapper">
        <div className="login-page">
          <div className="login-image">
            <img
              src="programmer.jpg"
              alt="Trulli"
              width="355px"
              height="380px"
              object-fit="cover"
            />
          </div>

          <div className="login-form">
            <div
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "orange",
                marginLeft: "50px",
                marginTop: "10px",
              }}
            >
              Codedrill Attendance
            </div>
            <label>{apiErr}</label>
            <div className="email-input">
              <label>
                <b>Email:</b>
              </label>
              <div className="input-icons">
                <i class="fa fa-envelope icon"></i>
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              {/* alert('This is an alert message) */}
              <label>{emailError}</label>
            </div>

            <div className="password-input">
              <label>
                <b>Password:</b>
              </label>
              <div className="input-icons">
                <i class="fa fa-key icon"></i>

                <input
                  className="input-field"
                  type={inputType}
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                />

                <i className={defaulteye} id="togglePassword"></i>
              </div>
              <label>{pwdError}</label>
            </div>

            <div className="login_button d-grid gap-2">
              <button
                className="btn btn-warning rounded-pill"
                onClick={handleClickEvent}
              >
                <b>Login</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
