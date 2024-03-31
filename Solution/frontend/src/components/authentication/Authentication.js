import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

function Authentication() {
  const [view, setView] = useState("login"); // 'login', 'register', or 'forgotPassword'

  const toggleView = () => {
    if (view === "login") {
      setView("register");
    } else if (view === "register" || view === "forgotPassword") {
      setView("login");
    }
  };

  const showForgotPassword = () => setView("forgotPassword");

  return (
    <div className="authentication-container">
      <div className="login-register-container">
        <div className="container">
          {view === "login" && <Login onForgotPassword={showForgotPassword} />}
          {view === "register" && <Register />}
          {view === "forgotPassword" && <ForgotPassword />}
          <div className="overlay-container" onClick={toggleView}>
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1>{view === "login" ? "Register" : "Login"}</h1>
                <p>
                  {view === "login"
                    ? "Enter your personal details and start your journey with us"
                    : "To keep connected with us please login with your personal info"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
