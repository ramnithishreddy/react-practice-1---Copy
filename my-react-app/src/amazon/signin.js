import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); // "email" or "password"
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ""));
  };

  const handleEmailContinue = () => {
    const input = emailOrPhone.trim();
    setError("");

    if (!input) {
      setError("Please enter your email or mobile number");
      return;
    }

    if (!validateEmail(input) && !validatePhone(input)) {
      setError("Please enter a valid email address or 10-digit mobile number");
      return;
    }

    setStep("password");
  };

  const handleSignIn = async () => {
    setError("");

    if (!password) {
      setError("Please enter your password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      setLoading(false);
      // Store session data
      sessionStorage.setItem("userEmail", emailOrPhone);
      sessionStorage.setItem("isLoggedIn", "true");
      // Navigate to home
      navigate("/");
    }, 1500);
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleBackToEmail = () => {
    setStep("email");
    setPassword("");
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (step === "email") {
        handleEmailContinue();
      } else {
        handleSignIn();
      }
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-wrapper">
        {/* Logo Section */}
        <div className="signin-header">
          <div className="amazon-logo">
            amazon<span className="logo-dot">.in</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="signin-card">
          <h1 className="signin-title">
            {step === "email" ? "Sign in" : "Sign in"}
          </h1>

          {/* Email/Phone Step */}
          {step === "email" && (
            <div className="form-step email-step">
              <label htmlFor="emailInput" className="form-label">
                Email or mobile phone number
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
                className="continue-button"
                onClick={handleEmailContinue}
                aria-label="Continue to password"
              >
                Continue
              </button>

              <div className="signin-help">
                <a href="#forgot" className="help-link">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          {/* Password Step */}
          {step === "password" && (
            <div className="form-step password-step">
              <div className="email-display">
                <span className="email-label">
                  {emailOrPhone}
                </span>
                <button
                  className="change-email-btn"
                  onClick={handleBackToEmail}
                  aria-label="Change email or phone number"
                >
                  Change
                </button>
              </div>

              <label htmlFor="passwordInput" className="form-label">
                Password
              </label>
              <input
                id="passwordInput"
                type="password"
                className="form-input"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                aria-label="Password input"
              />
              {error && <div className="error-message">{error}</div>}

              <div className="remember-me">
                <input
                  id="rememberCheckbox"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="remember-checkbox"
                />
                <label htmlFor="rememberCheckbox" className="remember-label">
                  Keep me signed in
                </label>
              </div>

              <button
                className="signin-button"
                onClick={handleSignIn}
                disabled={loading}
                aria-label="Sign in"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="signin-divider">
            <span>New to Amazon?</span>
          </div>

          {/* Create Account */}
          <button
            className="create-account-button"
            onClick={handleSignUp}
            aria-label="Create your Amazon account"
          >
            Create your Amazon account
          </button>
        </div>

        {/* Footer Links */}
        <div className="signin-footer">
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

export default SignIn;
