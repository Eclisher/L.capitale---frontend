import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [annonces, setAnnonces] = useState([]);
  const [newAnnonce, setNewAnnonce] = useState({ imageUrl: '', date: '', disponible: true, telephone: '', email: '' });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/annonces`)
      .then(response => setAnnonces(response.data))
      .catch(error => console.error("Erreur lors de la récupération des annonces", error));
  }, []);

  const handleAddAnnonce = () => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/annonces`, newAnnonce)
      .then(response => {
        setAnnonces([...annonces, response.data]);
        setNewAnnonce({ imageUrl: '', date: '', disponible: true, telephone: '', email: '' });
      })
      .catch(error => console.error("Erreur lors de l'ajout de l'annonce", error));
  };

  return (
    <div className="p-8 bg-white rounded shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold">Gestion des Annonces</h2>
      <div className="mt-6 space-y-4">
        {annonces.map((annonce) => (
          <div key={annonce.id} className="p-4 border rounded bg-gray-50">
            <p><strong>Date :</strong> {annonce.date}</p>
            <p><strong>Statut :</strong> {annonce.disponible ? "Disponible" : "Vendu"}</p>
            <p><strong>Téléphone :</strong> {annonce.telephone}</p>
            <p><strong>Email :</strong> {annonce.email}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Ajouter une Annonce</h3>
        <input
          type="text"
          placeholder="Image URL"
          value={newAnnonce.imageUrl}
          onChange={(e) => setNewAnnonce({ ...newAnnonce, imageUrl: e.target.value })}
          className="w-full border px-4 py-2 rounded mt-2"
        />
        {/* Autres champs similaires */}
        <button onClick={handleAddAnnonce} className="bg-green-600 text-white px-4 py-2 mt-4 rounded">
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
