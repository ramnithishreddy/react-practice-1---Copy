import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer';
import HomeIcon from '@mui/icons-material/Home';

export default function Layout() {
  return (
    <div className="container">
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/" ><HomeIcon fontSize='large' color='primary' /></Link>
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
              <Link className="nav-link"to= 'Home' >Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="Table">Operations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="Apicalling">Apicalling</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="EmployeeForm">Form</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="Contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
      <Footer />
    </div>
  );
}
