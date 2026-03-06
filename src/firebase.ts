// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrb2ibiJnTwrpwuUaATOe5IZwJUCRpnik",
  authDomain: "catalogos-ionlab.firebaseapp.com",
  projectId: "catalogos-ionlab",
  storageBucket: "catalogos-ionlab.firebasestorage.app",
  messagingSenderId: "340302257549",
  appId: "1:340302257549:web:104b173abc65e9bee831c4",
  measurementId: "G-4ECHDJJGLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
