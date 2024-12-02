import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQggQYdzYuQ1nQ4Qcv2WvBbd3PIm2zcD4",
  authDomain: "petblog-c96ec.firebaseapp.com",
  projectId: "petblog-c96ec",
  storageBucket: "petblog-c96ec.firebasestorage.app",
  messagingSenderId: "791772436653",
  appId: "1:791772436653:web:8bec7c3a63888fcfe84e24"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth, app }; 
