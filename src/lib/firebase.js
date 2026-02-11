import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBOuuhF9Z8myMZRv4yTG4HNy1oFGVKOqj8",
    authDomain: "friendd-f8554.firebaseapp.com",
    projectId: "friendd-f8554",
    storageBucket: "friendd-f8554.firebasestorage.app",
    messagingSenderId: "65455128091",
    appId: "1:65455128091:web:7d6b48974a26d79cb4c2be",
    measurementId: "G-CJKJ1J21L9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
