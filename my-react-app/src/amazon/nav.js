import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FASHION, GROCERY, MOBILES } from "./appDefault";

export default function Nav() {
  return (
    <div className="container">
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <HomeIcon fontSize="large" color="primary" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/grocery">
                {GROCERY}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mobiles">
                {MOBILES}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fashion">
                {FASHION}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <ShoppingCartIcon />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
