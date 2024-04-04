// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "myblog-3cd71.firebaseapp.com",
  projectId: "myblog-3cd71",
  storageBucket: "myblog-3cd71.appspot.com",
  messagingSenderId: "192562484916",
  appId: "1:192562484916:web:80e6ae2bf4ce76f115e9e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);