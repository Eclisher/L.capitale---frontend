import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaCalendarAlt, FaImage, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./Announcements.css";

const AllAnnonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/annonces")
      .then((response) => {
        console.log("Données reçues :", response.data);
        setAnnonces(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des annonces :", error);
        setError("Impossible de charger les annonces.");
        setLoading(false);
      });
  }, []);

  const getGoogleDriveImageUrl = (fileId) => {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  };

  if (loading) return <p className="loading">Chargement...</p>;
  if (error) return <p className="error">{error}</p>;
  if (annonces.length === 0) return <p className="no-data">Aucune annonce disponible.</p>;

  return (
    <div className="all-annonces-container">
      <h1 className="title">Toutes les Annonces</h1>
      <div className="annonces-grid">
        {annonces.map((annonce) => (
          <div key={annonce.id} className="annonce-card">
            <h2 className="annonce-title">{annonce.titre}</h2>
            <p className="annonce-date">
              <FaCalendarAlt className="icon" /> Publié le : {annonce.dateAnnonce}
            </p>

            {/* Badge de disponibilité */}
            <p className={`badge ${annonce.disponible ? "disponible" : "indisponible"}`}>
              {annonce.disponible ? (
                <><FaCheckCircle className="icon" /> Disponible</>
              ) : (
                <><FaTimesCircle className="icon" /> Indisponible</>
              )}
            </p>

            {/* Galerie d'images */}
            <div className="image-gallery">
              {annonce.imageUrls?.length > 0 ? (
                annonce.imageUrls.map((fileId, index) => (
                  <img
                    key={index}
                    src={getGoogleDriveImageUrl(fileId)}
                    alt={`Image ${index + 1}`}
                    className="annonce-image"
                  />
                ))
              ) : (
                <p className="no-images">
                  <FaImage className="icon" /> Aucune image disponible
                </p>
              )}
            </div>

            {/* Description */}
            <p className="annonce-description">{annonce.description}</p>

            {/* Contact */}
            <div className="contact-info">
              <p>
                <FaPhone className="icon" /> <strong>Téléphone :</strong> {annonce.numeroTelephone || "Non renseigné"}
              </p>
              <p>
                <FaEnvelope className="icon" /> <strong>Email :</strong> {annonce.email || "Non renseigné"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAnnonces;
