import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Announcements from "./components/Annoucement";
import About from "./components/About";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import AnnonceDetails from "./components/AnnonceDetails"; 
import { MessageProvider } from "./components/MessageContext";
import "./App.css";

const App = () => {
  return (
    <MessageProvider>
      <Router>
        <Navbar />
        <div className="p-6 bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/annonce/:id" element={<AnnonceDetails />} /> 
          </Routes>
        </div>
      </Router>
    </MessageProvider>
  );
};

export default App;
