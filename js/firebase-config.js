import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, onSnapshot, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Actual Firebase configuration from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDeVxDoA33yb1LTAkGqLP0VAEyoj-50CD8",
  authDomain: "kismet-investments.firebaseapp.com",
  projectId: "kismet-investments",
  storageBucket: "kismet-investments.firebasestorage.app",
  messagingSenderId: "513182179000",
  appId: "1:513182179000:web:9e69463119d484916c1e4d",
  measurementId: "G-SEPPW2L5KQ"
};

let db;
let auth;
let provider;

try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    db = getFirestore(app);

    // Initialize Firebase Authentication
    auth = getAuth(app);
    provider = new GoogleAuthProvider();
    
    // Fallback for state.js legacy accesses
    window.firebaseFirestore = { doc, setDoc, updateDoc, getDoc };
} catch (e) {
    console.warn("Firebase not configured yet. Using local mock data. Error: ", e);
}

export { db, auth, provider, collection, getDocs, addDoc, onSnapshot, doc, setDoc, updateDoc, getDoc, signInWithPopup, onAuthStateChanged, signOut };
