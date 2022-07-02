import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Login";
import EmpDashboard from "./Components/EmpDashboard";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";

class App extends Component {
  render() {
    return (
      <div>
        <Login />
        {/* <EmpDashboard/> */}
        {/* <AdminLogin /> */}
        {/* <AdminDashboard/> */}
      </div>
    );
  }
}

export default App;
