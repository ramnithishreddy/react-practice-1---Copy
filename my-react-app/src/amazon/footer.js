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
            <li><button className="link-button" onClick={() => alert('Navigate to Careers')}>Careers</button></li>
            <li><button className="link-button" onClick={() => alert('Navigate to Press Releases')}>Press Releases</button></li>
            <li><button className="link-button" onClick={() => alert('Navigate to Amazon Science')}>Amazon Science</button></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Connect with Us</h4>
          <ul>
            <li><button className="link-button" onClick={() => alert('Navigate to Facebook')}>Facebook</button></li>
            <li><button className="link-button" onClick={() => alert('Navigate to Twitter')}>Twitter</button></li>
            <li><button className="link-button" onClick={() => alert('Navigate to Instagram')}>Instagram</button></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Help</h4>
          <ul>
            <li><button className="link-button" onClick={() => alert('Navigate to Your Account')}>Your Account</button></li>
            <li><button className="link-button" onClick={() => alert('Navigate to Returns Centre')}>Returns Centre</button></li>
            <li><button className="link-button" onClick={() => alert('Navigate to Help')}>Help</button></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2023-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates</span>
        <ul>
          <li><button className="link-button" onClick={() => alert('Navigate to Conditions of Use')}>Conditions of Use</button></li>
          <li><button className="link-button" onClick={() => alert('Navigate to Privacy Notice')}>Privacy Notice</button></li>
          <li><button className="link-button" onClick={() => alert('Navigate to Interest-Based Ads')}>Interest-Based Ads</button></li>
        </ul>
      </div>
    </div>
  );
}
