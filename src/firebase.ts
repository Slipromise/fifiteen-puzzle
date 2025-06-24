import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqa7pyfezAJWRe0a1W44NxsckE3dS-Y_c",
  authDomain: "fifteen-puzzle-352c2.firebaseapp.com",
  projectId: "fifteen-puzzle-352c2",
  storageBucket: "fifteen-puzzle-352c2.firebasestorage.app",
  messagingSenderId: "964064624808",
  appId: "1:964064624808:web:d2ac3ed3ef53126ae3429d",
  measurementId: "G-17Y8GXTY66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app); 