// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">AI Planet Assistant</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload Document</Link>
        <Link to="/query">Query NLP</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;