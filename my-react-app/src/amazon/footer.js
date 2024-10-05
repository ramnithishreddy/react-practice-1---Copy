import React from "react";
import "./footer.css";

export default function Footer() {
  const topFunction = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer">
      <a
        className="back-to-top"
        href="#"
        onClick={topFunction}
        aria-label="Back to top"
      >
        Back to top
      </a>

      <div className="footer-links">
        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press Releases</a></li>
            <li><a href="#">Amazon Science</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Connect with Us</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Help</h4>
          <ul>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Returns Centre</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2023-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates</span>
        <ul>
          <li><a href="#">Conditions of Use</a></li>
          <li><a href="#">Privacy Notice</a></li>
          <li><a href="#">Interest-Based Ads</a></li>
        </ul>
      </div>
    </div>
  );
}
