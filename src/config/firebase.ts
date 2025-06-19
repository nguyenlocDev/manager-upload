import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCx0n3DPnvZlGsimlhHO9rayTc91e2TwTo",
  authDomain: "loyalty-51709.firebaseapp.com",
  projectId: "loyalty-51709",
  storageBucket: "loyalty-51709.firebasestorage.app",
  messagingSenderId: "168786342189",
  appId: "1:168786342189:web:595d0ab99045612d09e3a4",
  measurementId: "G-BLQFV68GJH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
