import React, { useState } from "react";
import "./AdminLogin.css";

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

  console.log(defaulteye);

  return (
    <div className="outer-slide">
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
                fontSize: "25px",
                fontWeight: "bold",
                color: "blue",
                marginLeft: "100px",
                marginTop: "10px",
              }}
            >
              Attendance
            </div>
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
                />
              </div>
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
                />

                <i
                  className={defaulteye}
                  onClick={ShowAndHidePassword}
                  id="togglePassword"
                ></i>
              </div>
            </div>

            <div className="login_button d-grid gap-2">
              <button className="btn btn-primary rounded-pill">
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
