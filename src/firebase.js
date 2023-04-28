// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtnq0uMFPR-uCOq3JuHpdNjmUjKNATVGU",
  authDomain: "the-archive-60d98.firebaseapp.com",
  projectId: "the-archive-60d98",
  storageBucket: "the-archive-60d98.appspot.com",
  messagingSenderId: "578043478228",
  appId: "1:578043478228:web:46178b894816ab49ec3b41",
  measurementId: "G-YF1K5LV43L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firestore = getFirestore(app);
export const auth = getAuth();

export { firestore };

