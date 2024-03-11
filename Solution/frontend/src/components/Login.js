import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER } from "../graphql/Mutations";
// import bcrypt from "bcrypt";

const Login = (props) => {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Use useMutation hook to define the createCustomer mutation
  const [createCustomer] = useMutation(CREATE_CUSTOMER);

  const showLoginForm = () => {
    setShowLogin(true);
  };

  const showRegisterForm = () => {
    setShowLogin(false);
  };

  const handleLogin = () => {
    // Implement login logic here

    console.log("Logging in with email:", email, "and password:", password);
  };

  const handleRegister = async () => {
    try {
      // Call the createCustomer mutation with customer data and type set to "online"
      const { data } = await createCustomer({
        variables: {
          customerInput: {
            email,
            password,
            type: "online", // Set the type to "online"
          },
        },
      });
      // Handle successful registration
      console.log("Registered successfully:", data);
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      {showLogin ? (
        <div>
          <div className="sp-login-container">
            <div className="sp-login">
              <div className="sp-base-container" ref={props.containerRef}>
                <div className="sp-toggle-btn">
                  <button className="sp-toggle-login" onClick={showLoginForm}>
                    Login
                  </button>
                  <button
                    className="sp-toggle-login"
                    onClick={showRegisterForm}
                  >
                    Register
                  </button>
                </div>
                <div className="login-content">
                  <div className="login-form">
                    <div className="form-group-login">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group-login">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="footer sp-center">
                  <button
                    className="sp-login-submit-btn"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                <div style={{ padding: "10px", textAlign: "center" }}>
                  <Link>
                    <u>Forget Password</u>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="sp-login">
            <div className="sp-base-container" ref={props.containerRef}>
              <div className="sp-toggle-btn">
                <button className="sp-toggle-login" onClick={showLoginForm}>
                  Login
                </button>
                <button className="sp-toggle-login" onClick={showRegisterForm}>
                  Register
                </button>
              </div>
              <div className="login-content">
                <div className="login-form">
                  <div className="form-group-login">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group-login">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group-login">
                    <label htmlFor="password">Confirm Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="footer sp-center">
                <button
                  className="sp-login-submit-btn"
                  type="button"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
              <div style={{ padding: "10px", textAlign: "center" }}>
                <Link>
                  <u>Forget Password</u>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
