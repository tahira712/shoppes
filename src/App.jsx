import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";


function App() {
  return (
    <Router>
 <HomePage/>
    </Router>
  );
}

export default App;
