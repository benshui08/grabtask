import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8u1Fk3Z5uSA-WWVg8dTVqTW7UqOXEJ1w",
  authDomain: "grabtask-io.firebaseapp.com",
  projectId: "grabtask-io",
  storageBucket: "grabtask-io.firebasestorage.app",
  messagingSenderId: "386224394409",
  appId: "1:386224394409:web:39ce64ff8b09672bf8d9b8",
  measurementId: "G-KZG3FZ9MTF"
};

// Initialize Firebase (prevent re-initialization in development)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };