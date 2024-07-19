import React, { useState } from "react";
import "../Style/login.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  function openRegister() {
    setShowRegister(true);
    setShowLogin(false);
  }

  function closeRegister() {
    setShowRegister(false);
  }

  function openLogin() {
    setShowLogin(true);
    setShowRegister(false);
  }

  function closeLogin() {
    setShowLogin(false);
  }

  return (
    <div>
      <div className={showLogin ? "login active" : "login"}>
        <div className="close" onClick={closeLogin}>
          <img src="../images/close.svg" alt="Close" />
        </div>

        <h3 className="title">Login</h3>
        <form action="">
          <label htmlFor="text">Username</label>
          <input type="text" placeholder="Username" />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" />
          <div className="remember-password">
            <span className="checkbox">
              <input type="checkbox" checked />
              <span className="checkmark"></span>
              <img src="../images/check.svg" alt="Checkmark" />
              <span style={{ marginLeft: "5px" }}>Remember me</span>
            </span>
            <span className="forgot underline">Forgot Password</span>
          </div>
          <div className="button">
            <button type="submit">Login</button>
          </div>

          <span className="sub">
            Not a member?
            <span className="register-text underline" onClick={openRegister}>
              Register Now
            </span>
          </span>
        </form>
      </div>

      <div className={showRegister ? "register active" : "register"}>
        <div className="close" onClick={closeRegister}>
          <img src="../images/close.svg" alt="Close" />
        </div>
        <h3 className="title">Register</h3>
        <form action="">
          <label htmlFor="text">Username</label>
          <input type="text" placeholder="Username" />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" />
          <label htmlFor="email">Email</label>
          <input type="password" placeholder="Email Address" />
          <div className="remember-password">
            <span className="checkbox">
              <input type="checkbox" name="reg-check" />
              <span className="checkmark2"></span>
              <img src="../images/check.svg" alt="Checkmark" />
              <span className="sub">I read and agree with</span>
            </span>

            <span className="forgot underline">Terms &Conditions</span>
          </div>
          <div className="button">
            <button type="submit">Register</button>
          </div>

          <span className="sub">
            Already have an account?
            <span className="register-text underline" onClick={openLogin}>
              Log in
            </span>
          </span>
        </form>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default Login;
