import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPhone, FaEnvelope, FaCalendarAlt, FaImage } from "react-icons/fa";
import "./AnnonceDetails.css";

const AnnonceDetails = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/annonces/${id}`)
      .then((response) => {
        setAnnonce(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'annonce :", error);
        setLoading(false);
      });
  }, [id]);

  const getGoogleDriveImageUrl = (fileId) => {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  };

  if (loading) return <p className="loading">Chargement...</p>;
  if (!annonce) return <p className="error">Annonce non trouvée.</p>;

  return (
    <div className="annonce-details-container">
      <h1 className="title">{annonce.titre}</h1>
      <p className="date">
        <FaCalendarAlt className="icon" /> Publié le : {annonce.dateAnnonce}
      </p>

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

      <p className="description">{annonce.description}</p>

      <div className="contact-info">
        <p>
          <FaPhone className="icon" /> <strong>Téléphone :</strong>{" "}
          {annonce.numeroTelephone}
        </p>
        <p>
          <FaEnvelope className="icon" /> <strong>Email :</strong> {annonce.email}
        </p>
      </div>
    </div>
  );
};

export default AnnonceDetails;
