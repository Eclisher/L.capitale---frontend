import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Account created", userCredential);
        navigate("/login");
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google Sign-In successful", result);
        navigate("/login");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white shadow-lg rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Créer un Compte Admin</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full mb-4">
          S'inscrire
        </button>
      </form>
      <button onClick={handleGoogleSignup} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full">
        S'inscrire avec Google
      </button>
    </div>
  );
};

export default SignupPage;
