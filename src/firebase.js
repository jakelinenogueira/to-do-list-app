import firebase from 'firebase/app';
import 'firebase/auth';  
import 'firebase/firestore';  


const firebaseConfig = {
  apiKey: "9eL4ussaFN-Dij2aS2wHySuwWQGRkuKW-g1KydEyAHE",
  authDomain: "firebase-adminsdk-fbsvc@to-do-list-app-e7900.iam.gserviceaccount.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
  measurementId: "SEU_MEASUREMENT_ID",
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
