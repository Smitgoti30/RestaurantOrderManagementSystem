import React from "react";
// import loginImg from "../../login.svg";

const Register = (props) => {
  return (
    <div className="sp-login-container" ref={props.containerRef}>
      <div className="login-header">Register</div>
      <div className="login-content">
        <div className="login-form">
          <div className="form-group-login">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" />
          </div>
          <div className="form-group-login">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="email" />
          </div>
          <div className="form-group-login">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" />
          </div>
        </div>
      </div>
      <div className="login-footer">
        <button type="button" className="btn">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
