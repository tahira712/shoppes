import React from "react";
import "../Style/login.css";
import { NavLink } from "react-router-dom";
const Login = () => {
  function openRegister() {
    let overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
    let register = document.querySelector(".register");
    register.style.display = "block";
    let login = document.querySelector(".login");
    login.style.display = "none";
  }
  function closeLogin() {
    let overlay = document.querySelector(".overlay");
    overlay.style.display = "none";
    let login = document.querySelector(".login");
    login.style.display = "none";
    document.body.style.overflow = "auto";
  }
  function closeRegister() {
    let overlay = document.querySelector(".overlay");
    overlay.style.display = "none";
    let register = document.querySelector(".register");
    register.style.display = "none";
    document.body.style.overflow = "auto";

   
  }
  function openLogin() {
      closeRegister();
    let overlay= document.querySelector('.overlay');
    overlay.style.display = 'block';
    let login= document.querySelector('.login');
    login.style.display = 'block';

  }
  function closeLogin() {
    let overlay= document.querySelector('.overlay');
    overlay.style.display = 'none';
    let login= document.querySelector('.login');
    login.style.display = 'none';
  }
  return (
    <div className="login-register">
      <div className="login">
      <div className="close" onClick={closeLogin}><img src="../images/close.svg" alt="" /></div>

        <h3 className="title">Login</h3>
        <form action="">
          <label htmlFor="text">Username</label>
          <input type="text" placeholder="Username" />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" />
          <div className="remember-password">
            <span className="checkbox">
              {" "}
              <input type="checkbox" checked />
              <span
                className="checkmark"
                onClick={() => {
                  let checkbox = document.querySelector(
                    'input[type="checkbox"]'
                  );
                  checkbox.checked = !checkbox.checked;
                  let checkmark = document.querySelector(".checkmark");

                  if (checkbox.checked) {
                    checkmark.style.backgroundColor = "transparent";
                  } else {
                    checkmark.style.backgroundColor = "white";
                  }
                }}
              ></span>
              <img src="../images/check.svg" alt="" />
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
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
      </div>
      <div className="register">
        <div className="close" onClick={closeRegister}><img src="../images/close.svg" alt="" /></div>
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
              {" "}
              <input type="checkbox" name="reg-check" />
              <span
                className="checkmark2"
                onClick={() => {
                  let checkbox = document.querySelector(
                    'input[name="reg-check"]'
                  );
                  checkbox.checked = !checkbox.checked;
                  let checkmark = document.querySelector(".checkmark2");

                  if (checkbox.checked) {
                    checkmark.style.backgroundColor = "transparent";
                  } else {
                    checkmark.style.backgroundColor = "white";
                  }
                }}
              ></span>
              <img src="../images/check.svg" alt="" />
              <span className="sub">
                I read and agree with
            </span>
            </span>
            
            <span className="forgot underline">Terms &Conditions</span>
          </div>
          <div className="button">
            <button type="submit">Login</button>
          </div>

          <span className="sub">
            Already have an account?
            <span className="register-text underline" onClick={openLogin}>
             Log in
            </span>
          </span>
        </form>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
      </div>
    </div>
  );
};

export default Login;
