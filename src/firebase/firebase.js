/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0cd2orwfDaOAv-AIK62NoJNcXxdKS_is",
  authDomain: "worldwise-69dba.firebaseapp.com",
  projectId: "worldwise-69dba",
  storageBucket: "worldwise-69dba.appspot.com",
  messagingSenderId: "66899530948",
  appId: "1:66899530948:web:df1aad6c22ec3f817ca591",
  measurementId: "G-FZ0099VFC1"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);

export default firebaseapp