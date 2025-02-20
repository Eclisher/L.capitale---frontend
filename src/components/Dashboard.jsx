import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaCalendarAlt, FaImage, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./Dashboard.css";

const AddAnnonce = () => {
    const [formData, setFormData] = useState({
        titre: "",
        description: "",
        dateAnnonce: "",
        disponible: true,
        numeroTelephone: "",
        email: "",
        images: []
    });

    const [annonces, setAnnonces] = useState([]);

    useEffect(() => {
        fetchAnnonces();
    }, []);

    const fetchAnnonces = () => {
        axios.get("http://localhost:8080/annonces")
            .then(response => setAnnonces(response.data))
            .catch(error => console.error("Erreur lors de la récupération des annonces :", error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, images: Array.from(e.target.files) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("titre", formData.titre);
        data.append("description", formData.description);
        data.append("dateAnnonce", formData.dateAnnonce);
        data.append("disponible", formData.disponible);
        data.append("numeroTelephone", formData.numeroTelephone);
        data.append("email", formData.email);
        formData.images.forEach((image) => {
            data.append("images", image);
        });

        axios.post("http://localhost:8080/annonces", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => {
                fetchAnnonces();
                setFormData({ titre: "", description: "", dateAnnonce: "", disponible: true, numeroTelephone: "", email: "", images: [] });
            })
            .catch(error => console.error("Erreur lors de l'ajout :", error));
    };

    const getGoogleDriveImageUrl = (fileId) => {
        return `https://lh3.googleusercontent.com/d/${fileId}`;
    };

    return (
        <div className="container">
            <h1 className="title">Ajouter une Annonce</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <input type="text" name="titre" placeholder="Titre" value={formData.titre} onChange={handleInputChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
                <input type="date" name="dateAnnonce" value={formData.dateAnnonce} onChange={handleInputChange} required />
                <select name="disponible" value={formData.disponible} onChange={handleInputChange} required>
                    <option value={true}>Disponible</option>
                    <option value={false}>Non disponible</option>
                </select>
                <input type="tel" name="numeroTelephone" placeholder="Téléphone" value={formData.numeroTelephone} onChange={handleInputChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                <input type="file" multiple onChange={handleFileChange} required />
                <button type="submit" className="btn add-btn">Ajouter</button>
            </form>
            <h2 className="title">Annonces Existantes</h2>
            <div className="annonce-grid">
                {annonces.map((annonce) => (
                    <div key={annonce.id} className="annonce-card">
                        <h3>{annonce.titre}</h3>
                        <p className="annonce-date">
                            <FaCalendarAlt className="icon" /> Publié le : {annonce.dateAnnonce}
                        </p>
                        <p className={`badge ${annonce.disponible ? "disponible" : "indisponible"}`}>
                            {annonce.disponible ? (
                                <><FaCheckCircle className="icon" /> Disponible</>
                            ) : (
                                <><FaTimesCircle className="icon" /> Indisponible</>
                            )}
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
                        <p className="annonce-description">{annonce.description}</p>
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

export default AddAnnonce;
