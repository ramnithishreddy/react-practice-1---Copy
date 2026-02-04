import React from "react";
import "./footer.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Footer() {
  const topFunction = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <button
        className="back-to-top"
        onClick={topFunction}
        aria-label="Back to top"
        title="Back to top"
      >
        <KeyboardArrowUpIcon /> Back to top
      </button>

      <div className="footer-content">
        <div className="footer-links">
          <div className="footer-column">
            <h4>Get to Know Us</h4>
            <ul>
              <li><a href="#careers" onClick={() => alert('Careers at Amazon')}>Careers</a></li>
              <li><a href="#press" onClick={() => alert('Press Releases')}>Press Releases</a></li>
              <li><a href="#amazon-science" onClick={() => alert('Amazon Science')}>Amazon Science</a></li>
              <li><a href="#blog" onClick={() => alert('Blog')}>Blog</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Connect with Us</h4>
            <ul>
              <li><a href="#facebook" onClick={() => alert('Follow us on Facebook')}>Facebook</a></li>
              <li><a href="#twitter" onClick={() => alert('Follow us on Twitter')}>Twitter</a></li>
              <li><a href="#instagram" onClick={() => alert('Follow us on Instagram')}>Instagram</a></li>
              <li><a href="#linkedin" onClick={() => alert('Connect on LinkedIn')}>LinkedIn</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Make Money with Us</h4>
            <ul>
              <li><a href="#sell" onClick={() => alert('Sell on Amazon')}>Sell on Amazon</a></li>
              <li><a href="#associates" onClick={() => alert('Amazon Associates')}>Amazon Associates</a></li>
              <li><a href="#advertise" onClick={() => alert('Advertise Your Products')}>Advertise Your Products</a></li>
              <li><a href="#publishing" onClick={() => alert('Self-Publish with Us')}>Self-Publish with Us</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Help & Settings</h4>
            <ul>
              <li><a href="#account" onClick={() => alert('Your Account')}>Your Account</a></li>
              <li><a href="#returns" onClick={() => alert('Returns Centre')}>Returns Centre</a></li>
              <li><a href="#help" onClick={() => alert('Help Centre')}>Help Centre</a></li>
              <li><a href="#accessibility" onClick={() => alert('Accessibility')}>Accessibility</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">
          <a href="#home" onClick={() => alert('Back to Home')}>Amazon</a>
        </div>
        <ul className="footer-policies">
          <li><a href="#conditions" onClick={() => alert('Conditions of Use')}>Conditions of Use</a></li>
          <li><a href="#privacy" onClick={() => alert('Privacy Notice')}>Privacy Notice</a></li>
          <li><a href="#cookies" onClick={() => alert('Cookies Notice')}>Cookies Notice</a></li>
          <li><a href="#ads" onClick={() => alert('Interest-Based Ads')}>Interest-Based Ads</a></li>
        </ul>
        <div className="footer-copyright">
          © 2024-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </footer>
  );
}
