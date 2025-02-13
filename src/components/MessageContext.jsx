import React, { createContext, useState } from "react";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (name, message) => {
    const newMessage = {
      id: messages.length + 1,
      name,
      date: new Date().toLocaleString(),
      message,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log("Message ajouté :", newMessage);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
