import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { FASHION, GROCERY, MOBILES } from "./appDefault";
import { useCart } from "./cartProvider";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.Qty, 0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="navbar-top">
        <div className="navbar-top-content">
          <div className="location-info">
            <LocationOnIcon className="location-icon" />
            <div>
              <span className="delivery-text">Deliver to</span>
              <span className="location-text">India 🇮🇳</span>
            </div>
          </div>
          <div className="language-selector">
            <LanguageIcon className="language-icon" />
            <span>English</span>
          </div>
          <div className="account-info">
            <AccountCircleIcon className="account-icon" />
            <div>
              <span className="account-label">Hello, User</span>
              <span className="signin-text">Sign in / Join</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar sticky-top">
        <div className="navbar-container">
          <Link className="navbar-brand" to="/" onClick={() => setIsOpen(false)}>
            <HomeIcon fontSize="large" />
            <span className="brand-text">Amazon</span>
          </Link>

          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search Amazon.in"
              className="search-input"
            />
            <button className="search-btn">
              <SearchIcon />
            </button>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            <MenuIcon />
          </button>

          <div className={`navbar-menu ${isOpen ? "open" : ""}`}>
            <ul className="navbar-nav">
              <li className={`nav-item ${isActive("/") ? "active" : ""}`}>
                <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>
                  <HomeIcon className="nav-icon" />
                  Home
                </Link>
              </li>
              <li className={`nav-item ${isActive("/grocery") ? "active" : ""}`}>
                <Link className="nav-link" to="/grocery" onClick={() => setIsOpen(false)}>
                  <span className="category-icon">🛒</span>
                  Fresh
                </Link>
              </li>
              <li className={`nav-item ${isActive("/mobiles") ? "active" : ""}`}>
                <Link className="nav-link" to="/mobiles" onClick={() => setIsOpen(false)}>
                  <span className="category-icon">📱</span>
                  Electronics
                </Link>
              </li>
              <li className={`nav-item ${isActive("/fashion") ? "active" : ""}`}>
                <Link className="nav-link" to="/fashion" onClick={() => setIsOpen(false)}>
                  <span className="category-icon">👕</span>
                  Fashion
                </Link>
              </li>
              <li className="nav-item">
                <div className="nav-link deals-link">
                  <TrendingUpIcon className="nav-icon" />
                  Best Deals
                </div>
              </li>
              <li className={`nav-item cart-item ${isActive("/cart") ? "active" : ""}`}>
                <Link className="nav-link cart-link" to="/cart" onClick={() => setIsOpen(false)}>
                  <ShoppingCartIcon className="nav-icon" />
                  <span className="cart-count">{cartCount}</span>
                  <span className="cart-label">Cart</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
