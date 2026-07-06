// Firebase Configuration
// Your AVS Firebase Project Credentials

const firebaseConfig = {
  apiKey: "AIzaSyDjdpbtA249NKqXufhPQUh-85u3BBrtZ64",
  authDomain: "av-31d7b.firebaseapp.com",
  databaseURL: "https://av-31d7b-default-rtdb.firebaseio.com",
  projectId: "av-31d7b",
  storageBucket: "av-31d7b.firebasestorage.app",
  messagingSenderId: "53251636337",
  appId: "1:53251636337:web:ef02b5cb814227f7a32fd0",
  measurementId: "G-GX6Y275Q76"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Realtime Database
const database = getDatabase(app);

// Export for use in other files
export { auth, database, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, ref, set, get };
