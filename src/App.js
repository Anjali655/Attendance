import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Login";
import EmpDashboard from "./Components/EmpDashboard";

class App extends Component {
  render() {
    return (
      <div >
        {/* <Login /> */}
        <EmpDashboard/>
      </div>
    );
  }
}

export default App;
