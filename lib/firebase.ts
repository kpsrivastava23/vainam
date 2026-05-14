// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNd-etOdglHhnEdK9E1YfGfCt9LCxfkuQ",
  authDomain: "vainam-8f3b8.firebaseapp.com",
  projectId: "vainam-8f3b8",
  storageBucket: "vainam-8f3b8.firebasestorage.app",
  messagingSenderId: "756312716719",
  appId: "1:756312716719:web:341ad1ce6ee3a251522b5a",
  measurementId: "G-SEY1PV4JJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();