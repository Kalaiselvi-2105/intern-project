// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpGkzryxf9EtMzuBp6DPZpelxtOzDUfSY",
  authDomain: "nexchat-1b3bf.firebaseapp.com",
  projectId: "nexchat-1b3bf",
  storageBucket: "nexchat-1b3bf.firebasestorage.app",
  messagingSenderId: "475581317630",
  appId: "1:475581317630:web:33bf4b6bdc7836aad140af",
  measurementId: "G-6KEF7H3HMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);