import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientPage = () => {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/annonces')
      .then(response => setAnnonces(response.data))
      .catch(error => console.error("Erreur lors de la récupération des annonces", error));
  }, []);

  return (
    <div className="p-8 bg-white rounded shadow-md max-w-4xl mx-auto mt-10">
      <header className="flex justify-between items-center pb-4 border-b">
        <h1 className="text-3xl font-bold text-gray-800">L. Capitale Blog</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => window.location.href = "/login"}
        >
          Admin Login
        </button>
      </header>
      <h2 className="text-2xl mt-6 font-semibold">Dernières Annonces</h2>
      <div className="mt-4 space-y-4">
        {annonces.map((annonce) => (
          <div key={annonce.id} className="p-4 border rounded bg-gray-50">
            <img src={annonce.imageUrl} alt="Annonce" className="w-full h-64 object-cover rounded mb-2" />
            <p><strong>Date :</strong> {annonce.date}</p>
            <p><strong>Statut :</strong> {annonce.disponible ? "Disponible" : "Vendu"}</p>
            <p><strong>Téléphone :</strong> {annonce.telephone}</p>
            <p><strong>Email :</strong> {annonce.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientPage;
