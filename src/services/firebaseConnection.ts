
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyGdZG5fvSV789gBA0mx22iV1HhxzYSVU",
  authDomain: "linktree-curso.firebaseapp.com",
  projectId: "linktree-curso",
  storageBucket: "linktree-curso.appspot.com",
  messagingSenderId: "255432247403",
  appId: "1:255432247403:web:86d92d772f8231bbf0492e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export {auth, db};