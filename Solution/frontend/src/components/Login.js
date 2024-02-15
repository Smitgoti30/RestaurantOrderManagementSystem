import React from "react";
// import loginImg from "../../login.svg";

const Login = (props) => {
  return (
    <div className="sp-login">
      <h1>Login | Register</h1>
      <div className="sp-base-container" ref={props.containerRef}>
        <div className="login-content">
          <div className="login-form">
            <div className="form-group-login">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group-login">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button className="sp-login-submit-btn" type="button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
