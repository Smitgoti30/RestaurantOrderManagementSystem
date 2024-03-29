import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../../graphql/Mutations.js";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import loginImg from "../../login.svg";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [executeLogin, { loading, error }] = useMutation(LOGIN, {
    variables: { email, password },
    onCompleted: (data) => {
      const userType = data.login.customer.type;
      login({
        token: data.login.token,
        userType,
        id: data.login.customer._id,
      });
      if (userType == "staff" || userType == "admin") {
        navigate("/customer");
      } else {
        navigate("/");
      }
      toast.success("Login successful");
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message}`);
    },
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validateEmail(email)) {
      toast.error("Invalid email.");
      isValid = false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      isValid = false;
    }

    if (isValid) {
      executeLogin();
    }
  };

  return (
    <div className="base-container">
      <div className="header">
        <h3>Login</h3>
      </div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="Login" />
        </div>
        <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ paddingBottom: "18px", textAlign: "center" }}>
            <Link to="/forget-password">
              <u>Forget Password</u>
            </Link>
          </div>
          <div className="footer d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-primary btn-sm">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
