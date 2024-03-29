import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Authentication() {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className="authentication-container">
      <div className="login-register-container">
        <div className="container">
          {isLoginView ? <Login /> : <Register />}
          <div className="overlay-container" onClick={toggleView}>
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1>{isLoginView ? "Register" : "Login"}</h1>
                <p>
                  {isLoginView
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
