// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "precook-recipe-app-project.firebaseapp.com",
  projectId: "precook-recipe-app-project",
  // storageBucket: "precook-recipe-app-project.appspot.com",
  messagingSenderId: "222983266976",
  appId: "1:222983266976:web:b5daf438a91c87785cdfc5",
  storageBucket: "gs://precook-recipe-app-project.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, provider, storage, db };
export default app;
