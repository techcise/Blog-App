
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyCiX-tYA3__IgJxxaVf7HyJgT9NDoi5rBQ",
  authDomain: "blog-app-2600b.firebaseapp.com",
  projectId: "blog-app-2600b",
  storageBucket: "blog-app-2600b.appspot.com",
  messagingSenderId: "1008791124685",
  appId: "1:1008791124685:web:870ceecb6a6ca1929b8784",
  measurementId: "G-D8RWP8FFTF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };