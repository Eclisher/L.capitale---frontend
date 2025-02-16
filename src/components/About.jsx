import React from "react";
import "./About.css";
import News  from "../assets/fiabilités.jpg"  
import Community from "../assets/communauté.jpg"
import Innovation from "../assets/inovation.jpg"
import Background from "../assets/background.jpg";

import Testimonial from "../assets/testimonial1.jpg";
import Testimonial2 from "../assets/testimonial2.jpg";
import Testimonial3 from "../assets/testimonial3.jpg";
const About = () => {
  return (
    <div className="about" style={{ backgroundImage: `url(${Background})` }}>
      <div className="about-overlay">
        <h1 className="about-title">À Propos de Nous</h1>
        <p className="about-text">
          🌍 L. Capitale est une plateforme qui permet à ses utilisateurs de rester informés grâce à des actualités et annonces pertinentes.
        </p>
        <p className="about-text">
          🚀 Notre mission est de créer une communauté engagée et informée en partageant des contenus authentiques et inspirants.
        </p>

        {/* Images décoratives */}
        <div className="about-images">
          <img src={Testimonial} alt="News" className="about-img" />
          <img src={Testimonial2} alt="Community" className="about-img" />
          <img src={Testimonial3} alt="Innovation" className="about-img" />
        </div>

        {/* Cartes interactives */}
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
