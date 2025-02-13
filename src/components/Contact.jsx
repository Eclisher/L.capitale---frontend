import React, { useState, useContext } from "react";
import { MessageContext } from "./MessageContext";
import "./Contact.css";

const Contact = () => {
  const { addMessage } = useContext(MessageContext);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!name.trim() || !message.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
  
    addMessage(name, message);
    setName("");
    setMessage("");
    alert("Votre message a été envoyé avec succès !");
  };
  

  return (
    <div className="contact">
      <h1>Contactez-nous</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Nom :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez votre nom"
          />
        </label>
        <label>
          Message :
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre message ici..."
          ></textarea>
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
