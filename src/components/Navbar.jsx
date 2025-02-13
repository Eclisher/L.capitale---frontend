import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="blog-title">L. Capitale</h1>

      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/announcements">Annonces</Link></li>
          <li><Link to="/about">À propos</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <button className="login-button" onClick={handleLoginClick}>
        Login 🔑
      </button>
    </nav>
  );
};

export default Navbar;
