// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLpqi78iOgF44wjX2zYTUQmoLL1HM3upY",
  authDomain: "react-movie-app-34b81.firebaseapp.com",
  projectId: "react-movie-app-34b81",
  storageBucket: "react-movie-app-34b81.appspot.com",
  messagingSenderId: "808662959677",
  appId: "1:808662959677:web:c5513fc501b77218fa4c54",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
