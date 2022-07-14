import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { useLazyQuery, gql } from "@apollo/client";

<script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js"></script>;
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
  crossorigin="anonymous"
></script>;

function AdminLogin() {
  const [eye, setEye] = useState(false);
  const [defaulteye, setSefaulteye] = useState("far fa-eye");
  const [inputType, setInputType] = useState("password");

  const GET_LOGIN = gql`
    query AdminLogin($input: loginInput) {
      adminLogin(input: $input) {
        data {
          token
        }
        message
        status
      }
    }
  `;

  function ShowAndHidePassword() {
    // console.log(defaulteye, 'defaulteye');
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
  const navigate = useNavigate();

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

      console.log(loginData?.data);

      if (loginData?.data?.adminLogin?.status === 200) {
        localStorage.clear();
        localStorage.setItem("token", loginData?.data?.adminLogin?.data?.token);
        navigate("/admin-dash");
      } else {
        setApiErr(loginData?.data?.adminLogin?.message);
      }
    } else {
      email ? setEmailErr("") : setEmailErr("Please enter login email");
      pwd ? setPwdErr("") : setPwdErr("Please enter valid password");
    }
  }

  // const navigate = useNavigate();
  const navigateToEmp = () => {
    navigate("/");
  };

  return (
    <div className="outer-slide">
      {/* <div className="classify">
          <button className="btn btn-success btn-md" onClick={navigateToEmp}>Employee Login</button>
      </div> */}
      <div variant="primary" className="classifybutton" onClick={navigateToEmp}>
        Employee Login
      </div>

      <div className="form-slide">
        <div className="login-slide">
          <div className="login-image">
            <img
              src="admin-login.jpg"
              alt="Trulli"
              width="355px"
              height="380px"
              object-fit="cover"
            />
          </div>

          <div className="login-form-slide">
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "blue",
                marginLeft: "60px",
                marginTop: "10px",
              }}
            >
              Attendance Management
            </div>
            <label>{apiErr}</label>
            <div className="email-input-slide">
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
              <label>{emailError}</label>
            </div>

            <div className="password-input-slide">
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

                <i
                  className={defaulteye}
                  onClick={ShowAndHidePassword}
                  id="togglePassword"
                ></i>
              </div>
              <label>{pwdError}</label>
            </div>

            <div className="login_button d-grid gap-2">
              <button
                className="btn btn-primary rounded-pill"
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

export default AdminLogin;
