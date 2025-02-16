import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [annonces, setAnnonces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/annonces")
      .then((response) => {
        setAnnonces(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des annonces :", error);
      });
  }, []);

  return (
    <div className="home">
      {/* Section d'en-tête */}
      <header className="hero-section">
        <h1>Bienvenue sur L. Capital</h1>
        <p>Découvrez des annonces passionnantes et des actualités captivantes.</p>
        <button className="cta-button">
          <Link to="/announcements">Explorez Maintenant</Link>
        </button>
      </header>
    {/***Code couleur: Noiree, Jaune, Blanc  */}

      {/* Section des annonces */}
      <section className="annonces-section">
        <h2>Dernières annonces</h2>
        <div className="annonces-grid">
          {annonces.map((annonce) => (
            <Link to={`/annonce/${annonce.id}`} key={annonce.id} className="annonce-card">
              <div
                className="annonce-image"
                style={{ backgroundImage: `url(${annonce.image})` }}
              ></div>
              <div className="annonce-info">
                <h3>{annonce.titre}</h3>
                <p>{annonce.description.substring(0, 80)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section des cartes informatives */}
      <section className="info-section">
        <div className="card" onClick={() => navigate("/announcements")}>
          <h2>Annonces</h2>
          <p>Restez à jour avec les dernières annonces de notre communauté.</p>
        </div>
        <div className="card" onClick={() => navigate("/about")}>
          <h2>À propos</h2>
          <p>En savoir plus sur notre mission et notre équipe dynamique.</p>
        </div>
        <div className="card" onClick={() => navigate("/contact")}>
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
