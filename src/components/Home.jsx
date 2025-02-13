import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Section d'en-tête */}
      <header className="hero-section">
        <h1>Bienvenue sur L. Capitale</h1>
        <p>Découvrez des annonces passionnantes et des actualités captivantes.</p>
        <button className="cta-button">Explorez Maintenant</button>
      </header>

      {/* Section des cartes informatives */}
      <section className="info-section">
        <div className="card">
          <h2>Annonces</h2>
          <p>Restez à jour avec les dernières annonces de notre communauté.</p>
        </div>
        <div className="card">
          <h2>À propos</h2>
          <p>En savoir plus sur notre mission et notre équipe dynamique.</p>
        </div>
        <div className="card">
          <h2>Contact</h2>
          <p>Nous sommes toujours à votre disposition. Contactez-nous !</p>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="footer">
        <p>&copy; 2025 L. Capitale - Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Home;
