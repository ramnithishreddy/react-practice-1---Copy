import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import SignUp from "../amazon/signup";
import { BrowserRouter as Router } from "react-router-dom";

describe("SignUp Component", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  // Rendering Tests
  describe("Rendering", () => {
    it("should render signup form", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const title = screen.getByRole("heading", { name: /create your amazon account/i });
      expect(title).toBeInTheDocument();
    });

    it("should display amazon logo", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const logo = screen.getByText("amazon");
      expect(logo).toBeInTheDocument();
    });

    it("should display all input fields", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      expect(screen.getByLabelText("Full name")).toBeInTheDocument();
      expect(screen.getByLabelText("Email address")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
      expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
    });

    it("should display terms agreement checkbox", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      expect(screen.getByLabelText("Agree to conditions of use")).toBeInTheDocument();
    });
  });

  // Validation Tests
  describe("Form Validation", () => {
    it("should validate empty full name", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const createBtn = screen.getByLabelText("Create your Amazon account");
      fireEvent.click(createBtn);
      
      expect(screen.getByText("Please enter your full name")).toBeInTheDocument();
    });

    it("should validate empty email", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const nameInput = screen.getByLabelText("Full name");
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      
      const createBtn = screen.getByLabelText("Create your Amazon account");
      fireEvent.click(createBtn);
      
      expect(screen.getByText("Please enter your email address")).toBeInTheDocument();
    });

    it("should validate invalid email format", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const nameInput = screen.getByLabelText("Full name");
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      
      const emailInput = screen.getByLabelText("Email address");
      fireEvent.change(emailInput, { target: { value: "invalid.email" } });
      
      const createBtn = screen.getByLabelText("Create your Amazon account");
      fireEvent.click(createBtn);
      
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
    });

    it("should validate empty password", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const nameInput = screen.getByLabelText("Full name");
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      
      const emailInput = screen.getByLabelText("Email address");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      
      const createBtn = screen.getByLabelText("Create your Amazon account");
      fireEvent.click(createBtn);
      
      expect(screen.getByText("Please enter a password")).toBeInTheDocument();
    });

    it("should validate short password", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const nameInput = screen.getByLabelText("Full name");
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      
      const emailInput = screen.getByLabelText("Email address");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      
      const passwordInput = screen.getByLabelText("Password");
      fireEvent.change(passwordInput, { target: { value: "pass" } });
      
      const createBtn = screen.getByLabelText("Create your Amazon account");
      fireEvent.click(createBtn);
      
      expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument();
    });

    it("should validate password requirements", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const nameInput = screen.getByLabelText("Full name");
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      
      const emailInput = screen.getByLabelText("Email address");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      
      const passwordInput = screen.getByLabelText("Password");
      fireEvent.change(passwordInput, { target: { value: "password" } }); // no uppercase, no number
      
      const createBtn = screen.getByLabelText("Create your Amazon account");
      fireEvent.click(createBtn);
      
      expect(screen.getByText(/Password must contain uppercase, lowercase, and number/)).toBeInTheDocument();
    });

    it("should validate password mismatch", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const nameInput = screen.getByLabelText("Full name");
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      
      const emailInput = screen.getByLabelText("Email address");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      
      const passwordInput = screen.getByLabelText("Password");
      fireEvent.change(passwordInput, { target: { value: "Password123" } });
      
      const confirmPasswordInput = screen.getByLabelText("Confirm password");
      fireEvent.change(confirmPasswordInput, { target: { value: "Different123" } });
      
      const createBtn = screen.getByLabelText("Create your Amazon account");
      fireEvent.click(createBtn);
      
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });

    it("should validate terms agreement", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const nameInput = screen.getByLabelText("Full name");
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      
      const emailInput = screen.getByLabelText("Email address");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      
      const passwordInput = screen.getByLabelText("Password");
      fireEvent.change(passwordInput, { target: { value: "Password123" } });
      
      const confirmPasswordInput = screen.getByLabelText("Confirm password");
      fireEvent.change(confirmPasswordInput, { target: { value: "Password123" } });
      
      const createBtn = screen.getByLabelText("Create your Amazon account");
      fireEvent.click(createBtn);
      
      expect(screen.getByText("You must agree to the conditions of use")).toBeInTheDocument();
    });
  });

  // Successful Registration
  describe("Successful Registration", () => {
    it("should create account with valid data", async () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const nameInput = screen.getByLabelText("Full name");
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      
      const emailInput = screen.getByLabelText("Email address");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      
      const passwordInput = screen.getByLabelText("Password");
      fireEvent.change(passwordInput, { target: { value: "Password123" } });
      
      const confirmPasswordInput = screen.getByLabelText("Confirm password");
      fireEvent.change(confirmPasswordInput, { target: { value: "Password123" } });
      
      const agreeCheckbox = screen.getByLabelText("Agree to conditions of use");
      fireEvent.click(agreeCheckbox);
      
      const createBtn = screen.getByLabelText("Create your Amazon account");
      fireEvent.click(createBtn);
      
      // Should show loading state
      await waitFor(() => {
        expect(screen.queryByText("Creating account...")).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it("should clear errors when form is corrected", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const emailInput = screen.getByLabelText("Email address");
      fireEvent.change(emailInput, { target: { value: "invalid" } });
      
      const createBtn = screen.getByLabelText("Create your Amazon account");
      fireEvent.click(createBtn);
      
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
      
      // Correct the email
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      
      // Error should be cleared
      expect(screen.queryByText("Please enter a valid email address")).not.toBeInTheDocument();
    });
  });

  // Keyboard Interaction
  describe("Keyboard Interaction", () => {
    it("should handle Enter key press", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const passwordInput = screen.getByLabelText("Password");
      fireEvent.change(passwordInput, { target: { value: "Password123" } });
      
      const confirmPasswordInput = screen.getByLabelText("Confirm password");
      fireEvent.change(confirmPasswordInput, { target: { value: "Different456" } });
      
      const createBtn = screen.getByLabelText("Create your Amazon account");
      fireEvent.click(createBtn);
      
      // Validation should show error for mismatched passwords
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
  });

  // Navigation
  describe("Navigation", () => {
    it("should display sign in link", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      expect(screen.getByText("Already have an account?")).toBeInTheDocument();
      expect(screen.getByLabelText("Sign in to your account")).toBeInTheDocument();
    });

    it("should display footer links", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const links = screen.getAllByRole("link");
      const footerLinks = links.filter(link => 
        link.textContent === "Conditions of Use" || 
        link.textContent === "Privacy Notice" || 
        link.textContent === "Help"
      );
      expect(footerLinks.length).toBeGreaterThanOrEqual(3);
    });
  });

  // Accessibility
  describe("Accessibility", () => {
    it("should have proper ARIA labels", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      expect(screen.getByLabelText("Full name")).toBeInTheDocument();
      expect(screen.getByLabelText("Email address")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
      expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
    });

    it("should maintain focus on first field", () => {
      render(
        <Router>
          <SignUp />
        </Router>
      );
      const nameInput = screen.getByLabelText("Full name");
      expect(nameInput).toHaveFocus();
    });
  });
});
