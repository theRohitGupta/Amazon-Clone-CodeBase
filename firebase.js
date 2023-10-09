// import firebase from 'firebase/app';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDq9do02-wf_IOlxSoy6xXWFzC7J9mbzNI",
  authDomain: "ama-zon-clone-byrohitgupta.firebaseapp.com",
  projectId: "ama-zon-clone-byrohitgupta",
  storageBucket: "ama-zon-clone-byrohitgupta.appspot.com",
  messagingSenderId: "46953791159",
  appId: "1:46953791159:web:3f632443e510b146fe9732"
};

// const app = initializeApp(firebaseConfig);
// Initialize Firebase
// const app = !firebase.apps.length 
// ? firebase.initializeApp(firebaseConfig) 
// : firebase.app();
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

const db = getFirestore(app);

export { db };


// const db = getFirestore(app);
// const db = app.firestore();

// export default db;

// import { initializeApp, getApps, getApp } from "firebase/app";
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();



