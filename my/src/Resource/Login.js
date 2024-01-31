import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const match = userInfo.find(
      (item) => item.email === email && item.password === password
    );
    if (match) {
      setErrorMessage("");
      alert("Login successful!");
      nav("/", { state: match });
      setUserInfo("");
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/SignUp">Sign Up here</Link>
      </p>
    </div>
  );
};

export default Login;
