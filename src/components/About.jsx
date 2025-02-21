import React from "react";
import "./About.css";
import News  from "../assets/fiabilités.jpg"  
import Community from "../assets/communauté.jpg"
import Innovation from "../assets/inovation.jpg"
import Background from "../assets/background.jpg";

const About = () => {
  return (
    <div className="about" style={{ backgroundImage: `url(${Background})` }}>
      <div className="about-overlay">
        <h1 className="about-title">À Propos de Nous</h1>
        <p className="about-text">
          🌍 Liona Capital est une plateforme gratuite pour déposer vos petites annonces sur les ventes de fond commerce, une première à Madagascar
        </p>
        <p className="about-text">
          🚀 Pour publier une annonce, vous pouvez nous contacter en laissant un message sur le site, ou en envoyant un email à l'adresse mentionnée dans les contacts
        </p>

        <div className="about-cards">
          <div className="about-card">
            <img src={News} alt="Fiabilité" className="card-img" />
            <h2>Fiabilité</h2>
            <p>Nos informations sont vérifiées et pertinentes.</p>
          </div>
          <div className="about-card">
            <img src={Community} alt="Communauté" className="card-img" />
            <h2>Communauté</h2>
            <p>Nous connectons les gens à travers des actualités et discussions.</p>
          </div>
          <div className="about-card">
            <img src={Innovation} alt="Innovation" className="card-img" />
            <h2>Innovation</h2>
            <p>Nous utilisons les meilleures technologies pour un site interactif.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
