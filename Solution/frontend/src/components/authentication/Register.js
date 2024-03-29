import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER } from "../../graphql/Mutations";
import loginImg from "../../login.svg";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const [createCustomer, { loading, error }] = useMutation(CREATE_CUSTOMER, {
    onCompleted: (data) => {
      console.log("Registration successful", data);
      // Reset form or redirect user
      toast.success("Registration successful, please login.", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setValidationErrors([]);
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const validateForm = () => {
    const errors = [];

    // Email validation
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.push("Invalid email address");
    }

    // Password length validation
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    // Password complexity validation
    if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password)) {
      errors.push(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)"
      );
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }

    setValidationErrors(errors);
    return errors.length === 0; // Form is valid if there are no errors
  };
  useEffect(() => {
    validationErrors.forEach((errMsg) => {
      toast.error(errMsg, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }, [validationErrors]);

  const handleRegister = async () => {
    if (!validateForm()) {
      // Prevent submission if the form is invalid
      return;
    }

    try {
      await createCustomer({
        variables: {
          customerInput: {
            email,
            password,
            type: "online",
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="base-container">
      <div className="header">
        <h3>Register</h3>
      </div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="Registration" />
        </div>
        <div className="form">
          {/* Email input */}
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
          {/* Password input */}
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
          {/* Confirm Password input */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="footer d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={handleRegister}
          disabled={loading}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
