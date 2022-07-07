import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Login";
import EmpDashboard from "./Components/EmpDashboard";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import AddEmp from "./Components/AddEmp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/emp-dash" element={<EmpDashboard />} />
              <Route exact path="/admin" element={<AdminLogin />} />
              <Route path="/admin-dash" element={<AdminDashboard />} />
              <Route path="/add-emp" element={<AddEmp />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
