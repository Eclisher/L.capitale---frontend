import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaHome, FaBullhorn, FaInfoCircle, FaEnvelope, FaBars } from "react-icons/fa";
import { BiSolidGridAlt } from "react-icons/bi";
import "./Navbar.css";
import logo from "../assets/logo.png"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleTitleClick = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo-title" onClick={handleTitleClick}>
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="blog-title">L. Capital</h1>
      </div>

      <button className="menu-button" onClick={toggleMenu}>
        <BiSolidGridAlt />
      </button>

      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}><FaHome className="menu-icon" /> <span className="menu-text">Accueil</span></Link></li>
          <li><Link to="/announcements" onClick={toggleMenu}><FaBullhorn className="menu-icon" /> <span className="menu-text">Annonces</span></Link></li>
          <li><Link to="/about" onClick={toggleMenu}><FaInfoCircle className="menu-icon" /> <span className="menu-text">À propos</span></Link></li>
          <li><Link to="/contact" onClick={toggleMenu}><FaEnvelope className="menu-icon" /> <span className="menu-text">Contact</span></Link></li>
        </ul>
      </div>

      <button className="login-button" onClick={handleLoginClick}>
        <FaSignInAlt className="login-icon" /> <span>Login</span>
      </button>
    </nav>
  );
};

export default Navbar;
