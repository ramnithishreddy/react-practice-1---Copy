import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import SignIn from "../amazon/signin";
import { BrowserRouter as Router } from "react-router-dom";

describe("SignIn Component", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  // Email/Phone Step Tests
  describe("Email/Phone Step", () => {
    it("should render email step on initial load", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const input = screen.getByLabelText("Email or phone number input");
      expect(input).toBeInTheDocument();
    });

    it("should display amazon logo", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const logo = screen.getByText("amazon");
      expect(logo).toBeInTheDocument();
    });

    it("should validate empty email", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const continueBtn = screen.getByLabelText("Continue to password");
      fireEvent.click(continueBtn);
      
      const error = screen.getByText("Please enter your email or mobile number");
      expect(error).toBeInTheDocument();
    });

    it("should validate invalid email format", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const input = screen.getByLabelText("Email or phone number input");
      fireEvent.change(input, { target: { value: "invalid.email" } });
      
      const continueBtn = screen.getByLabelText("Continue to password");
      fireEvent.click(continueBtn);
      
      const error = screen.getByText(
        "Please enter a valid email address or 10-digit mobile number"
      );
      expect(error).toBeInTheDocument();
    });

    it("should accept valid email", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const input = screen.getByLabelText("Email or phone number input");
      fireEvent.change(input, { target: { value: "test@example.com" } });
      
      const continueBtn = screen.getByLabelText("Continue to password");
      fireEvent.click(continueBtn);
      
      // Should not show error
      expect(screen.queryByText(/Please enter a valid/)).not.toBeInTheDocument();
    });

    it("should accept valid 10-digit phone number", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const input = screen.getByLabelText("Email or phone number input");
      fireEvent.change(input, { target: { value: "9876543210" } });
      
      const continueBtn = screen.getByLabelText("Continue to password");
      fireEvent.click(continueBtn);
      
      // Should transition to password step
      const passwordInput = screen.getByLabelText("Password input");
      expect(passwordInput).toBeInTheDocument();
    });

    it("should handle Enter key press", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const input = screen.getByLabelText("Email or phone number input");
      fireEvent.change(input, { target: { value: "test@example.com" } });
      fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });
      
      // Wait a moment for state update
      setTimeout(() => {
        const passwordInput = screen.queryByLabelText("Password input");
        expect(passwordInput).toBeInTheDocument();
      }, 100);
    });
  });

  // Password Step Tests
  describe("Password Step", () => {
    it("should show password step after email", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const input = screen.getByLabelText("Email or phone number input");
      fireEvent.change(input, { target: { value: "test@example.com" } });
      
      const continueBtn = screen.getByLabelText("Continue to password");
      fireEvent.click(continueBtn);
      
      const passwordInput = screen.getByLabelText("Password input");
      expect(passwordInput).toBeInTheDocument();
    });

    it("should display email/phone for verification", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const email = "test@example.com";
      const input = screen.getByLabelText("Email or phone number input");
      fireEvent.change(input, { target: { value: email } });
      
      const continueBtn = screen.getByLabelText("Continue to password");
      fireEvent.click(continueBtn);
      
      expect(screen.getByText(email)).toBeInTheDocument();
    });

    it("should allow changing email", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const input = screen.getByLabelText("Email or phone number input");
      fireEvent.change(input, { target: { value: "test@example.com" } });
      
      const continueBtn = screen.getByLabelText("Continue to password");
      fireEvent.click(continueBtn);
      
      const changeBtn = screen.getByLabelText("Change email or phone number");
      fireEvent.click(changeBtn);
      
      // Should go back to email step
      const emailInput = screen.getByLabelText("Email or phone number input");
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveValue("test@example.com");
    });

    it("should validate empty password", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const input = screen.getByLabelText("Email or phone number input");
      fireEvent.change(input, { target: { value: "test@example.com" } });
      
      const continueBtn = screen.getByLabelText("Continue to password");
      fireEvent.click(continueBtn);
      
      const signinBtn = screen.getByLabelText("Sign in");
      fireEvent.click(signinBtn);
      
      const error = screen.getByText("Please enter your password");
      expect(error).toBeInTheDocument();
    });

    it("should validate short password", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const emailInput = screen.getByLabelText("Email or phone number input");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      
      const continueBtn = screen.getByLabelText("Continue to password");
      fireEvent.click(continueBtn);
      
      const passwordInput = screen.getByLabelText("Password input");
      fireEvent.change(passwordInput, { target: { value: "123" } });
      
      const signinBtn = screen.getByLabelText("Sign in");
      fireEvent.click(signinBtn);
      
      const error = screen.getByText("Password must be at least 6 characters");
      expect(error).toBeInTheDocument();
    });

    it("should handle Remember Me checkbox", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const input = screen.getByLabelText("Email or phone number input");
      fireEvent.change(input, { target: { value: "test@example.com" } });
      
      const continueBtn = screen.getByLabelText("Continue to password");
      fireEvent.click(continueBtn);
      
      const rememberCheckbox = screen.getByLabelText("Keep me signed in");
      expect(rememberCheckbox).toBeInTheDocument();
      fireEvent.click(rememberCheckbox);
      expect(rememberCheckbox).toBeChecked();
    });

    it("should handle valid sign in", async () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const emailInput = screen.getByLabelText("Email or phone number input");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      
      const continueBtn = screen.getByLabelText("Continue to password");
      fireEvent.click(continueBtn);
      
      const passwordInput = screen.getByLabelText("Password input");
      fireEvent.change(passwordInput, { target: { value: "Password123" } });
      
      const signinBtn = screen.getByLabelText("Sign in");
      fireEvent.click(signinBtn);
      
      // Should show loading state
      await waitFor(() => {
        expect(screen.queryByText("Signing in...")).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it("should handle Enter key press in password field", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const emailInput = screen.getByLabelText("Email or phone number input");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      
      const continueBtn = screen.getByLabelText("Continue to password");
      fireEvent.click(continueBtn);
      
      const passwordInput = screen.getByLabelText("Password input");
      fireEvent.change(passwordInput, { target: { value: "Password123" } });
      fireEvent.keyPress(passwordInput, { key: "Enter", code: "Enter", charCode: 13 });
      
      // Should trigger sign in (loading state)
      setTimeout(() => {
        expect(screen.queryByText("Signing in...")).toBeInTheDocument();
      }, 100);
    });
  });

  // Footer and Links Tests
  describe("Footer and Links", () => {
    it("should display footer links", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      expect(screen.getByText("Conditions of Use")).toBeInTheDocument();
      expect(screen.getByText("Privacy Notice")).toBeInTheDocument();
      expect(screen.getByText("Help")).toBeInTheDocument();
    });

    it("should display forgot password link", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      expect(screen.getByText("Forgot your password?")).toBeInTheDocument();
    });

    it("should display create account section", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      expect(screen.getByText("New to Amazon?")).toBeInTheDocument();
      expect(screen.getByLabelText("Create your Amazon account")).toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("should have proper ARIA labels", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      expect(screen.getByLabelText("Email or phone number input")).toBeInTheDocument();
    });

    it("should maintain focus management", () => {
      render(
        <Router>
          <SignIn />
        </Router>
      );
      const input = screen.getByLabelText("Email or phone number input");
      expect(input).toHaveFocus();
    });
  });
});
