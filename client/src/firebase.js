// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.VITE_FIREBASE_API_KEY,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-306df.firebaseapp.com",
  projectId: "mern-blog-306df",
  storageBucket: "mern-blog-306df.firebasestorage.app",
  messagingSenderId: "411480203841",
  appId: "1:411480203841:web:40e8a6a6670ef9e763dcc0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
