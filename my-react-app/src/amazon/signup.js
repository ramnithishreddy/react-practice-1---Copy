import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Please enter a password";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the conditions of use";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate registration delay
    setTimeout(() => {
      setLoading(false);
      // Store user data
      sessionStorage.setItem("userEmail", formData.email);
      sessionStorage.setItem("userName", formData.fullName);
      sessionStorage.setItem("isLoggedIn", "true");
      // Navigate to home
      navigate("/");
    }, 1500);
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateAccount();
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        {/* Logo Section */}
        <div className="signup-header">
          <div className="amazon-logo">
            amazon<span className="logo-dot">.in</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="signup-card">
          <h1 className="signup-title">Create your Amazon account</h1>

          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Your name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              className={`form-input ${errors.fullName ? "input-error" : ""}`}
              placeholder="First and last name"
              value={formData.fullName}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              autoFocus
              aria-label="Full name"
            />
            {errors.fullName && (
              <div className="error-message">{errors.fullName}</div>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className={`form-input ${errors.email ? "input-error" : ""}`}
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              aria-label="Email address"
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className={`form-input ${errors.password ? "input-error" : ""}`}
              placeholder="At least 6 characters (1 uppercase, 1 number)"
              value={formData.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              aria-label="Password"
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
            <div className="password-hint">
              Minimum 6 characters with uppercase letter and number
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Re-enter password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className={`form-input ${
                errors.confirmPassword ? "input-error" : ""
              }`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              aria-label="Confirm password"
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="form-group agreement">
            <input
              id="agreeTerms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                if (e.target.checked && errors.terms) {
                  setErrors((prev) => ({
                    ...prev,
                    terms: "",
                  }));
                }
              }}
              className="agreement-checkbox"
              aria-label="Agree to conditions of use"
            />
            <label htmlFor="agreeTerms" className="agreement-label">
              I agree to the{" "}
              <a href="#conditions" className="link">
                Conditions of Use
              </a>{" "}
              and{" "}
              <a href="#privacy" className="link">
                Privacy Notice
              </a>
            </label>
          </div>
          {errors.terms && (
            <div className="error-message">{errors.terms}</div>
          )}

          {/* Create Account Button */}
          <button
            className="create-button"
            onClick={handleCreateAccount}
            disabled={loading}
            aria-label="Create your Amazon account"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating account...
              </>
            ) : (
              "Create your Amazon account"
            )}
          </button>

          {/* Sign In Link */}
          <div className="signin-link-section">
            <span>Already have an account?</span>
            <button
              className="signin-link"
              onClick={handleSignIn}
              aria-label="Sign in to your account"
            >
              Sign in
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="signup-footer">
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

export default SignUp;
