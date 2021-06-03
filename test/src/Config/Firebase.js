import firebase from "firebase/app";
import "firebase/auth";
//import getConfig from "./SetUp";

// Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyA8FW4GHHpxXjPEUTASFLUOnHZSvwCZE1o",
  authDomain: "movie-box-4a7ce.firebaseapp.com",
  projectId: "movie-box-4a7ce",
  storageBucket: "movie-box-4a7ce.appspot.com",
  messagingSenderId: "850952764763",
  appId: "1:850952764763:web:ac2b3d471d85792145ae7e",
};

// const config = getConfig();

// var firebaseConfig = {
//   apiKey: config.REACT_APP_FIREBASE_API_KEY,
//   authDomain: config.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: config.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: config.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: config.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: config.REACT_APP_FIREBASE_APP_ID,
// };

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
