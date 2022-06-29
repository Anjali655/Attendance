import React from "react";
import "./Login.css";

<script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js"></script>;
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
  crossorigin="anonymous"></script>;

// { <script>
// const togglePassword = document.querySelector('#togglePassword');
//   const password = document.querySelector('#id_password');

//   togglePassword.addEventListener('click', function (e) {
//     // toggle the type attribute
//     const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
//     password.setAttribute('type', type);
//     // toggle the eye slash icon
//     this.classList.toggle('fa-eye-slash');
// });
// </script> }

function Login() {
  return (
    <div className="outer-wrapper">
      <div className="form-wrapper">
        <div className="login-page">
          <div className="login-image">
            <img
              src="programmer.jpg"
              alt="Trulli"
              width="350px"
              height="380px"
              object-fit="cover"
              
            />
          </div>

          <div className="login-form">
            <div style ={{fontSize: "25px", fontWeight: "bold", color: "orange", marginLeft: "50px", marginTop: "10px"}}>
            Codedrill Attendance
            </div>
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
                <i class="far fa-eye" id="togglePassword"></i>
              </div>
            </div>

            <div className="login_button d-grid gap-2">
              <button className="btn btn-warning rounded-pill">
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
