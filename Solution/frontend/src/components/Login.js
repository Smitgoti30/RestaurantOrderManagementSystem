import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  // const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (login or registration) here
    // You can make API calls or perform other actions based on the form data
    console.log("Form submitted:", formData);
  };

  return (
    <div className="login-div">
      <h1>Login | Register</h1>
      <div class="form-div">
        <div class="button-box">
          <button class="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </button>
        </div>

        <form class="form-box" onSubmit={handleSubmit}>
          <label>Your Name*: </label>
          <input
            class="input"
            type="text"
            name="emailOrUsername"
            placeholder="Enter email or username"
            value={formData.emailOrUsername}
            onChange={handleInputChange}
            required
          />

          <label>Your Email Address*: </label>
          <input
            class="input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {!isLogin && (
            <input
              class="input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          )}

          <button class="toggle-btn" type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>

      {/* Add additional elements like social login buttons here */}
    </div>
  );
};

export default Login;
