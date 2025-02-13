
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBU9Fl6RqqGBGfO-8Kff3kSMvvLmD_eVSI",
  authDomain: "lcapitale-3c66a.firebaseapp.com",
  projectId: "lcapitale-3c66a",
  storageBucket: "lcapitale-3c66a.appspot.com",
  messagingSenderId: "220669873066",
  appId: "1:220669873066:web:ca3576e0c3c821707979d3",
  measurementId: "G-3BHXQ2RKM5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
