import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store";
import "./i18n";
import { Provider } from "react-redux";
// import './firebase';
import { FirebaseAppProvider, FirestoreProvider } from "reactfire";
import { initializeApp } from "firebase/app";
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
  measurementId: "G-17Y8GXTY66",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// const analytics = getAnalytics(firebaseApp);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <FirestoreProvider sdk={getFirestore(firebaseApp)}>
        <Provider store={store}>
          <App />
        </Provider>
      </FirestoreProvider>
    </FirebaseAppProvider>
  </StrictMode>,
);
