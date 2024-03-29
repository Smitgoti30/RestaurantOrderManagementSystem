import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { VERIFY_EMAIL, RESET_PASSWORD } from "../../graphql/Mutations"; // Ensure these are defined according to the new requirements
import loginImg from "../../login.svg";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showVerificationCodeInput, setShowVerificationCodeInput] =
    useState(false);
  const [showPasswordResetFields, setShowPasswordResetFields] = useState(false);

  const [verifyEmail, { loading: verifyingEmail }] = useMutation(VERIFY_EMAIL, {
    variables: { email },
    onCompleted: () => {
      setShowVerificationCodeInput(true);
      toast.success("Verification code sent to your email.");
    },
    onError: (error) => {
      toast.error(`Failed to send verification code: ${error.message}`);
    },
  });

  const [resetPassword, { loading: resettingPassword }] = useMutation(
    RESET_PASSWORD,
    {
      variables: {
        email,
        verificationCode,
        newPassword: password,
      },
      onCompleted: () => {
        toast.success("Password has been reset successfully, please login.");
        setEmail("");
        setVerificationCode("");
        setPassword("");
        setConfirmPassword("");
        setShowVerificationCodeInput(false);
        setShowPasswordResetFields(false);
      },
      onError: (error) => {
        toast.error(`Failed to reset password: ${error.message}`);
      },
    }
  );

  const validateEmailForm = () => {
    let errors = [];

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.push("Invalid email address");
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }
    return true;
  };

  const validateResetForm = () => {
    let errors = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password)) {
      errors.push(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)"
      );
    }

    if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }
    return true;
  };

  const handleVerifyEmail = async () => {
    if (!validateEmailForm()) return;
    try {
      await verifyEmail({ variables: { email } });
    } catch (error) {
      console.error("Error sending verification code", error);
    }
  };

  const handleResetPassword = async () => {
    if (!validateResetForm()) return;
    try {
      await resetPassword({
        variables: { email, verificationCode, newPassword: password },
      });
    } catch (error) {
      console.error("Error resetting password", error);
    }
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
    if (e.target.value.length === 6) {
      // Assuming a 6-digit verification code
      setShowPasswordResetFields(true);
    } else {
      setShowPasswordResetFields(false);
    }
  };

  return (
    <div className="base-container">
      <div className="header">
        <h3>Reset</h3>
      </div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="Password reset" />
        </div>
        <div className="form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={showVerificationCodeInput}
            />
            {!showVerificationCodeInput && (
              <div className="footer d-flex justify-content-center mt-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleVerifyEmail}
                  disabled={verifyingEmail}
                >
                  Verify
                </button>
              </div>
            )}
          </div>
          {showVerificationCodeInput && (
            <div className="form-group">
              {/* <label htmlFor="verificationCode">Verification Code</label> */}
              <input
                type="text"
                name="verificationCode"
                placeholder="Verification code"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
            </div>
          )}
          {showPasswordResetFields && (
            <>
              <div className="form-group">
                {/* <label htmlFor="password">New Password</label> */}
                <input
                  type="password"
                  name="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="confirmPassword">Confirm New Password</label> */}
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {showPasswordResetFields && (
        <div className="footer d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={handleResetPassword}
            disabled={resettingPassword}
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
