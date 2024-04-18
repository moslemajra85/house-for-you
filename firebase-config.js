// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgOcCQVWTMvAoZdhbmEuYWEj0uvfzpjhc",
  authDomain: "houses-de951.firebaseapp.com",
  projectId: "houses-de951",
  storageBucket: "houses-de951.appspot.com",
  messagingSenderId: "897115729783",
  appId: "1:897115729783:web:3167d4ea27b0ef91017b72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore