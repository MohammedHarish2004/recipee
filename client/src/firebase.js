// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "recipee-a55b6.firebaseapp.com",
  projectId: "recipee-a55b6",
  storageBucket: "recipee-a55b6.appspot.com",
  messagingSenderId: "933825664232",
  appId: "1:933825664232:web:10630524b254b6f945255d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);