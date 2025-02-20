import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [annonces, setAnnonces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/annonces")
      .then((response) => {
        setAnnonces(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des annonces :", error);
      });
  }, []);

  const getGoogleDriveImageUrl = (fileId) => {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  };

  return (
    <div className="home">
      <header className="hero-section">
        <h1>Bienvenue sur L.Capital</h1>
        <p>Découvrez des annonces passionnantes et des actualités captivantes.</p>
        <button className="cta-button">
          <Link to="/announcements">Explorez Maintenant</Link>
        </button>
      </header>

      <section className="annonces-section">
        <h2>Dernières annonces</h2>
        <div className="annonces-grid">
          {annonces.map((annonce) => (
            <div key={annonce.id} className="annonce-card">
              <div
                className="annonce-background"
                style={{
                  backgroundImage: `url(${
                    annonce.imageUrls && annonce.imageUrls.length > 0
                      ? getGoogleDriveImageUrl(annonce.imageUrls[0])
                      : "/default-image.jpg"
                  })`,
                }}
              >
                <div className="annonce-content">
                  <h3>{annonce.titre}</h3>
                  <p>{annonce.description.substring(0, 80)}...</p>
                  <Link to={`/annonce/${annonce.id}`} className="annonce-link">
                    Voir plus
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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

      <footer className="footer">
        <p>&copy; 2025 L. Capital - Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Home;