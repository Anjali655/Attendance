import React from "react";
import "./Login.css";

<script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js"></script>;
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
  crossorigin="anonymous"></script>;

function Login() {
  return (
    <div className="outer-wrapper">
      <div className="form-wrapper">
        <div className="login-page">
          <div className="login-image">
            <img
              src="Mobile-login-Cristina.jpg"
              alt="Trulli"
              width="300px"
              height="450px"
              
            />
          </div>

          <div className="login-form">
            <h1>
              <b>LOGIN FORM</b>
            </h1>
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
                />
              </div>
            </div>

            <div className="password-input">
              <label>
                <b>Password:</b>
              </label>
              <div className="input-icons">
                <i class="fa fa-key icon"></i>
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                />
                {/* <i class="far fa-eye" id="togglePassword"></i> */}
              </div>
            </div>

            <div className="login_button">
              <button className="btn btn-warning">
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
