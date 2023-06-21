// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy-TCES69gB6eRgNJqBFteH9P4HglguzA",
  authDomain: "cerebral-ba8bb.firebaseapp.com",
  databaseURL: "https://cerebral-ba8bb-default-rtdb.firebaseio.com",
  projectId: "cerebral-ba8bb",
  storageBucket: "cerebral-ba8bb.appspot.com",
  messagingSenderId: "146070486249",
  appId: "1:146070486249:web:5179813474a92a128d4478"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig) , db = getDatabase(app) , auth = getAuth(app) ;