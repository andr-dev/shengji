import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Navbar from "./NavBar";
import WindowManager from "./WindowManager";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <WindowManager />
      </div>
    </Router>
  );
}
// function App() {
//   return (
//     <div className="App">
//       <h2>ShengJi</h2>
//       <Lobby></Lobby>
//     </div>
//   );
// }

export default App;
