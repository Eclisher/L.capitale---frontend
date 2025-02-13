import React from "react";
import "./Announcements.css";

const Announcements = () => {
  return (
    <div className="announcements">
      <h1>Dernières Annonces</h1>
      <p>Découvrez les nouvelles annonces publiées récemment.</p>
      <ul className="announcement-list">
        <li>🔔 Offre spéciale pour les utilisateurs fidèles.</li>
        <li>📅 Prochain événement de la communauté prévu le 15 février.</li>
        <li>🛠 Maintenance prévue ce dimanche de 00h à 02h.</li>
      </ul>
    </div>
  );
};

export default Announcements;
