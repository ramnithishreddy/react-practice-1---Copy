import "./App.css";
import "./Resource/assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./Resource/Home";
import Login from "./Resource/Login";
import SignUp from "./Resource/SignUp";
import Issue from "./Resource/Issue";
import Tickets from "./Resource/Tickets";
import Logout from "./Resource/Logout";

function App() {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home userInfo={userInfo} />}>
            <Route path="Login" element={<Login setUserInfo={setUserInfo} />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route
              path="Tickets"
              element={userInfo ? <Tickets /> : <Navigate to="/Login" />}
            />
            <Route
              path="Issue"
              element={userInfo ? <Issue /> : <Navigate to="/Login" />}
            />
            <Route path="Logout" element={<Logout />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
