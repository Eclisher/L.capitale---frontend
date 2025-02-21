import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name.trim() || !message.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
  
    const newMessage = { name, messageContext: message };
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erreur lors de l'envoi du message");
      }
  
      alert("Votre message a été envoyé avec succès !");
      setName(""); // Remet le champ à zéro
      setMessage(""); // Remet le champ à zéro
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'envoi du message. Vérifiez la console.");
    }
  };
  

  return (
    <div className="contact-container">
      <div className="contact-overlay"></div>

      <div className="contact-content">
        <h1>Contactez-nous</h1>
        <p>Nous serons ravis de vous entendre !</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez votre nom"
          />

          <label>Message :</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre message ici..."
          ></textarea>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
