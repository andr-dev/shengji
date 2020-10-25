import React from "react";

import "./NavBar.css";

import logo from "./assets/logo.png";

class Navbar extends React.Component {
  render() {
    return (
      <div className="App-Navbar">
        <div className="App-Navbar-Container">
          <img id="App-Navbar-Logo" src={logo}></img>
        </div>
      </div>
    );
  }
}

export default Navbar;
