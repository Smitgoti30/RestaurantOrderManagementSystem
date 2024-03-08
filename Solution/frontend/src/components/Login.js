import React from "react";
import { Link } from "react-router-dom";
// import loginImg from "../../login.svg";

const Login = (props) => {
  return (
    <>
      <div className="sp-login-container">
        <div className="sp-login">
          <div className="sp-base-container" ref={props.containerRef}>
            <h1 className="sp-h1">Login</h1>
            <div className="login-content">
              <div className="login-form">
                <div className="form-group-login">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" placeholder="email" />
                </div>
                <div className="form-group-login">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                </div>
              </div>
            </div>
            <div className="footer sp-center">
              <button className="sp-login-submit-btn" type="button">
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="sp-login">
          <div className="sp-base-container" ref={props.containerRef}>
            <h1 className="sp-h1">Register</h1>

            <div className="login-content">
              <div className="login-form">
                <div className="form-group-login">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" placeholder="email" />
                </div>
                <div className="form-group-login">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                </div>
                <div className="form-group-login">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="confirm password"
                  />
                </div>
              </div>
            </div>
            <div className="footer sp-center">
              <button className="sp-login-submit-btn" type="button">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "10px", textAlign: "center" }}>
        <Link>
          <u>Forget Password</u>
        </Link>
      </div>
    </>
  );
};

export default Login;
