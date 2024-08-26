// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-56fb4.firebaseapp.com",
  projectId: "mern-estate-56fb4",
  storageBucket: "mern-estate-56fb4.appspot.com",
  messagingSenderId: "423440091381",
  appId: "1:423440091381:web:26f6594c0838b463ed1dbc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);