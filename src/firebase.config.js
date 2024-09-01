// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7njdJIpgj9kzIOYEqYelVwmo5FtzAiCI",
    authDomain: "university-marketplace-ac342.firebaseapp.com",
    projectId: "university-marketplace-ac342",
    storageBucket: "university-marketplace-ac342.appspot.com",
    messagingSenderId: "640927315657",
    appId: "1:640927315657:web:ddc36717814950b6b9bf18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
