// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJfX8rHFPjM6ZMYqWa3camVNAWzaSWEdc",
  authDomain: "syncaton.firebaseapp.com",
  projectId: "syncaton",
  storageBucket: "syncaton.appspot.com",
  messagingSenderId: "516674124417",
  appId: "1:516674124417:web:91f71094ec6ec4b2b56b80",
  measurementId: "G-3E29XQYMNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);