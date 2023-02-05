// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1khYl-YurA5p4qGxJdCYbsy0LcbQwT6Q",
    authDomain: "house-marketplace-app-3f75e.firebaseapp.com",
    projectId: "house-marketplace-app-3f75e",
    storageBucket: "house-marketplace-app-3f75e.appspot.com",
    messagingSenderId: "881419479489",
    appId: "1:881419479489:web:f8019dd99051dacabfe740"
};

// Initialize Firebase
export const db= getFirestore();