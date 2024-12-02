import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBirE5dXhzsRhPYRSxslFqqlkj2rIWmdNU",
  authDomain: "fast-connect-fa1e6.firebaseapp.com",
  projectId: "fast-connect-fa1e6",
  storageBucket: "fast-connect-fa1e6.firebasestorage.app",
  messagingSenderId: "771679147920",
  appId: "1:771679147920:web:c0322f42264811cade8515",
  measurementId: "G-WPHQMHE730",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
