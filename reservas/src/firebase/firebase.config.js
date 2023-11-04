// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyC-if1-pvnbnylD1KJjriovfQyjP7AXFW4",
    authDomain: "reservas-5c669.firebaseapp.com",
    projectId: "reservas-5c669",
    storageBucket: "reservas-5c669.appspot.com",
    messagingSenderId: "729284506929",
    appId: "1:729284506929:web:cf39133ae92af46b48ac10",
    measurementId: "G-NXY3RRR71H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);