import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc48UveCCMniagEMpo8FWVJw4V-panK0E",
  authDomain: "to-do-list-app-e7900.firebaseapp.com",
  projectId: "to-do-list-app-e7900",
  storageBucket: "to-do-list-app-e7900.firebasestorage.app",
  messagingSenderId: "959134618040",
  appId: "1:959134618040:web:9da7591057ab660fc87f4d",
  measurementId: "G-B1M6F95FSB"
};

// Inicializa o Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializa os serviços
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };

