import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); // "email", "verify", "reset"
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ""));
  };

  const handleEmailSubmit = () => {
    setError("");
    const input = emailOrPhone.trim();

    if (!input) {
      setError("Please enter your email or mobile number");
      return;
    }

    if (!validateEmail(input) && !validatePhone(input)) {
      setError("Please enter a valid email address or 10-digit mobile number");
      return;
    }

    // Check if user exists
    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
    if (!allUsers[input]) {
      setError("No account found with this email or phone number");
      return;
    }

    setLoading(true);

    // Simulate sending verification code
    setTimeout(() => {
      setLoading(false);
      // Generate random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      console.log("Verification code:", code); // For testing purposes
      setVerificationCode(code);
      setStep("verify");
      setSuccess(`Verification code sent to ${input}`);
    }, 1500);
  };

  const handleVerificationSubmit = () => {
    setError("");

    if (!enteredCode.trim()) {
      setError("Please enter the verification code");
      return;
    }

    if (enteredCode !== verificationCode) {
      setError("Invalid verification code. Please try again.");
      return;
    }

    setStep("reset");
    setEnteredCode("");
  };

  const handleResetPassword = () => {
    setError("");

    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(newPassword)) {
      setError("Password must contain uppercase, lowercase, and number");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // Simulate password update
    setTimeout(() => {
      setLoading(false);

      // Update password in localStorage
      const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
      if (allUsers[emailOrPhone]) {
        allUsers[emailOrPhone].password = newPassword;
        localStorage.setItem("allUsers", JSON.stringify(allUsers));
      }

      // Also update by phone if it exists
      const userByPhone = Object.values(allUsers).find(
        (u) => u.phone === emailOrPhone
      );
      if (userByPhone) {
        userByPhone.password = newPassword;
        localStorage.setItem("allUsers", JSON.stringify(allUsers));
      }

      setSuccess("Password reset successfully! Redirecting to sign in...");

      // Redirect to signin after 2 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    }, 1500);
  };

  const handleBackToSignIn = () => {
    navigate("/signin");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (step === "email") {
        handleEmailSubmit();
      } else if (step === "verify") {
        handleVerificationSubmit();
      } else if (step === "reset") {
        handleResetPassword();
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-wrapper">
        {/* Logo Section */}
        <div className="forgot-password-header">
          <div className="amazon-logo">
            amazon<span className="logo-dot">.in</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="forgot-password-card">
          <h1 className="forgot-password-title">
            {step === "email"
              ? "Reset your password"
              : step === "verify"
              ? "Verify your identity"
              : "Create new password"}
          </h1>

          {success && <div className="success-message">{success}</div>}

          {/* Email/Phone Step */}
          {step === "email" && (
            <div className="form-step">
              <label htmlFor="emailInput" className="form-label">
                Enter your email or mobile number
              </label>
              <input
                id="emailInput"
                type="text"
                className="form-input"
                placeholder="example@gmail.com or 9876543210"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                aria-label="Email or phone number input"
              />
              {error && <div className="error-message">{error}</div>}

              <button
                className="submit-button"
                onClick={handleEmailSubmit}
                disabled={loading}
                aria-label="Search for your account"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Searching...
                  </>
                ) : (
                  "Search for your account"
                )}
              </button>
            </div>
          )}

          {/* Verification Step */}
          {step === "verify" && (
            <div className="form-step">
              <p className="step-description">
                We've sent a verification code to {emailOrPhone}
              </p>

              <label htmlFor="codeInput" className="form-label">
                Verification code
              </label>
              <input
                id="codeInput"
                type="text"
                className="form-input"
                placeholder="Enter 6-digit code"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                maxLength="6"
                aria-label="Verification code input"
              />
              {error && <div className="error-message">{error}</div>}

              <button
                className="submit-button"
                onClick={handleVerificationSubmit}
                disabled={loading}
                aria-label="Verify"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </button>

              <div className="resend-section">
                <button
                  className="link-button"
                  onClick={() => setStep("email")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#0066c0",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Didn't receive the code? Try another method
                </button>
              </div>
            </div>
          )}

          {/* Reset Password Step */}
          {step === "reset" && (
            <div className="form-step">
              <label htmlFor="newPassword" className="form-label">
                New password
              </label>
              <input
                id="newPassword"
                type="password"
                className="form-input"
                placeholder="At least 6 characters (1 uppercase, 1 number)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                aria-label="New password input"
              />

              <label htmlFor="confirmNewPassword" className="form-label">
                Confirm password
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                className="form-input"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                aria-label="Confirm password input"
              />

              {error && <div className="error-message">{error}</div>}

              <div className="password-hint">
                Password must be at least 6 characters with uppercase letter and
                number
              </div>

              <button
                className="submit-button"
                onClick={handleResetPassword}
                disabled={loading}
                aria-label="Reset password"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Resetting...
                  </>
                ) : (
                  "Reset password"
                )}
              </button>
            </div>
          )}

          {/* Back to Sign In */}
          <div className="back-section">
            <button
              className="link-button"
              onClick={handleBackToSignIn}
              style={{
                background: "none",
                border: "none",
                color: "#0066c0",
                cursor: "pointer",
                textDecoration: "underline",
                marginTop: "15px",
              }}
            >
              Back to Sign In
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="forgot-password-footer">
          <div className="footer-links">
            <a href="#conditions" className="footer-link">
              Conditions of Use
            </a>
            <span className="divider">|</span>
            <a href="#privacy" className="footer-link">
              Privacy Notice
            </a>
            <span className="divider">|</span>
            <a href="#help" className="footer-link">
              Help
            </a>
          </div>
          <p className="copyright">
            © 1996-2026, Amazon Clone Inc. or its affiliates
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
