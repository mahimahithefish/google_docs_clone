import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // access to firestore database

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmg56kUhznv8YYF7wmEyRk61IZ5wr6VRk",
  authDomain: "docs-clone-d8441.firebaseapp.com",
  projectId: "docs-clone-d8441",
  storageBucket: "docs-clone-d8441.appspot.com",
  messagingSenderId: "588684746438",
  appId: "1:588684746438:web:d6333914dd9219cef081c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
