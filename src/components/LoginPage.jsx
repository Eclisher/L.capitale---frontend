import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 
import { FcGoogle } from "react-icons/fc"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div> 
      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          {error && <p className="error-text">{error}</p>}
          
          {/* Conteneur des boutons pour les centrer */}
          <div className="button-container">
            <button className="login" type="submit">
              Login
            </button>
            <button className="google-login-button" onClick={handleGoogleLogin}>
            <FcGoogle className="google-icon" />  Login with Google    
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
