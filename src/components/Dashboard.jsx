import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [annonces, setAnnonces] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        titre: "",
        description: "",
        image: null, // Image à uploader
        numeroTelephone: "",
        email: "", // Ajout de l'email
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchAnnonces();
    }, []);

    function fetchAnnonces() {
        axios.get("http://localhost:8080/annonces")
            .then(response => {
                setAnnonces(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des annonces :", error);
            });
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleImageChange(e) {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("titre", formData.titre);
        data.append("description", formData.description);
        data.append("numeroTelephone", formData.numeroTelephone);
        data.append("email", formData.email); // Ajout de l'email
        if (formData.image) data.append("image", formData.image);

        if (isEditing) {
            axios.put(`http://localhost:8080/annonces/${formData.id}`, data)
                .then(() => {
                    fetchAnnonces();
                    resetForm();
                })
                .catch(error => console.error("Erreur lors de la mise à jour :", error));
        } else {
            axios.post("http://localhost:8080/annonces", data)
                .then(() => {
                    fetchAnnonces();
                    resetForm();
                })
                .catch(error => console.error("Erreur lors de l'ajout :", error));
        }
    }

    function resetForm() {
        setFormData({ id: null, titre: "", description: "", image: null, numeroTelephone: "", email: "" });
        setIsEditing(false);
    }

    function handleEdit(annonce) {
        setFormData({
            id: annonce.id,
            titre: annonce.titre,
            description: annonce.description,
            numeroTelephone: annonce.numeroTelephone || "",
            email: annonce.email || "", // Ajout de l'email
        });
        setIsEditing(true);
    }

    function handleDelete(id) {
        axios.delete(`http://localhost:8080/annonces/${id}`)
            .then(() => {
                setAnnonces(annonces.filter(annonce => annonce.id !== id));
            })
            .catch(error => console.error("Erreur lors de la suppression :", error));
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Tableau de Bord Admin</h1>

            {/* Formulaire d'ajout / édition */}
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
                <h2 className="text-xl font-semibold mb-2">
                    {isEditing ? "Modifier l'Annonce" : "Ajouter une Annonce"}
                </h2>
                <input type="text" name="titre" placeholder="Titre" value={formData.titre}
                       onChange={handleInputChange} className="w-full p-2 border mb-2" required />
                <textarea name="description" placeholder="Description" value={formData.description}
                          onChange={handleInputChange} className="w-full p-2 border mb-2" required />
                <input type="tel" name="numeroTelephone" placeholder="Téléphone"
                       value={formData.numeroTelephone} onChange={handleInputChange}
                       className="w-full p-2 border mb-2" />
                <input type="email" name="email" placeholder="Email"
                       value={formData.email} onChange={handleInputChange}
                       className="w-full p-2 border mb-2" required /> {/* Ajout du champ email */}
                <input type="file" onChange={handleImageChange} className="mb-2" />
                <button type="submit"
                        className={`px-4 py-2 text-white rounded ${isEditing ? "bg-blue-500" : "bg-green-500"}`}>
                    {isEditing ? "Modifier" : "Ajouter"}
                </button>
            </form>

            {/* Liste des annonces */}
            <div className="grid grid-cols-3 gap-4">
                {annonces.map((annonce, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{annonce.titre}</h2>
                        <p>{annonce.description}</p>
                        {annonce.imageUrl && (
                            <img src={`http://localhost:8080/${annonce.imageUrl}`} alt="Annonce"
                                 className="mt-2 w-full h-40 object-cover rounded"/>
                        )}
                        <p className="text-sm text-gray-600 mt-2">Contact : {annonce.numeroTelephone || "N/A"}</p>
                        <p className="text-sm text-gray-600 mt-1">Email : {annonce.email || "N/A"}</p> {/* Affichage de l'email */}
                        <div className="mt-2">
                            <button className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                                    onClick={() => handleEdit(annonce)}>
                                Modifier
                            </button>
                            <button className="px-3 py-1 bg-red-500 text-white rounded"
                                    onClick={() => handleDelete(annonce.id)}>
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
