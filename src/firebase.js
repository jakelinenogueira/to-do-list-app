import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "9eL4ussaFN-Dij2aS2wHySuwWQGRkuKW-g1KydEyAHE",
  authDomain: "to-do-list-app-e7900.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
  measurementId: "SEU_MEASUREMENT_ID",
};

// Inicializa o Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializa os serviços
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };

