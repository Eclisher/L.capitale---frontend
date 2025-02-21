import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaCalendarAlt, FaImage, FaCheckCircle, FaTimesCircle, FaEnvelopeOpenText } from "react-icons/fa";
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
    const [messages, setMessages] = useState([]);
    const [showMessages, setShowMessages] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchAnnonces();
        fetchMessages();
    }, []);

    const fetchAnnonces = () => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/annonces`)
            .then(response => setAnnonces(response.data))
            .catch(error => console.error("Erreur lors de la récupération des annonces :", error));
    };

    const fetchMessages = () => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/message`)
            .then(response => {
                console.log("Messages reçus :", response.data);
                setMessages(response.data);
            })
            .catch(error => console.error("Erreur lors de la récupération des messages :", error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        if (newFiles.length > 5) {
            alert("Vous ne pouvez télécharger que 5 images à la fois.");
            return;
        }
        setFormData(prev => ({ ...prev, images: [...prev.images, ...newFiles] }));
    };
    

    const removeImage = (index) => {
        setFormData(prev => {
            const newImages = [...prev.images];
            newImages.splice(index, 1);
            return { ...prev, images: newImages };
        });
    };
    const handleDeleteMessage = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
            axios.delete(`${import.meta.env.VITE_API_BASE_URL}/${id}`)
                .then(() => {
                    setMessages(messages.filter(msg => msg.id !== id));
                    setSuccessMessage("Message supprimé avec succès.");
                    setErrorMessage("");
                })
                .catch(error => {
                    console.error("Erreur lors de la suppression :", error);
                    setErrorMessage("Erreur lors de la suppression du message.");
                    setSuccessMessage("");
                });
        }
    };
    
    const handleDeleteAnnonce = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
            axios.delete(`${import.meta.env.VITE_API_BASE_URL}/annonces/${id}`)
                .then(() => {
                    fetchAnnonces();
                    setSuccessMessage("Annonce supprimée avec succès.");
                    setErrorMessage("");
                })
                .catch(error => {
                    console.error("Erreur lors de la suppression :", error);
                    setErrorMessage("Erreur lors de la suppression de l'annonce.");
                    setSuccessMessage("");
                });
        }
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

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/annonces`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => {
                fetchAnnonces();
                setFormData({ titre: "", description: "", dateAnnonce: "", disponible: true, numeroTelephone: "", email: "", images: [] });
                setSuccessMessage("Annonce ajoutée avec succès.");
                setErrorMessage("");
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout :", error);
                setErrorMessage("Erreur lors de l'ajout de l'annonce.");
                setSuccessMessage("");
            });
    };

    const getGoogleDriveImageUrl = (fileId) => {
        return `https://lh3.googleusercontent.com/d/${fileId}`;
    };

    return (
        <div className="container">
            <div className="message-dropdown">
                <button className="btn message-btn" onClick={() => setShowMessages(!showMessages)}>
                    <FaEnvelopeOpenText className="icon" /> Messages Reçus
                </button>
                {showMessages && (
                    <ul className="message-list">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <li key={index} className="message-item">
                                    <strong>{msg.name}</strong>: {msg.messageContext}
                                    <button className="delete-btn" onClick={() => handleDeleteMessage(msg.id)}>
                                        <FaTimesCircle className="icon" /> Supprimer
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="message-item">Aucun message reçu</li>
                        )}
                    </ul>
                )}
            </div>
            <h1 className="title">Ajouter une Annonce</h1>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
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
                <div className="image-preview">
                    {formData.images.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
                            <button type="button" onClick={() => removeImage(index)}>
                                <FaTimesCircle className="icon" /> Supprimer
                            </button>
                        </div>
                    ))}
                </div>
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
  loading="lazy"
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
                        <button className="delete-btn" onClick={() => handleDeleteAnnonce(annonce.id)}>
                            <FaTimesCircle className="icon" /> Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddAnnonce;