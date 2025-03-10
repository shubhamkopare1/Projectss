// Import necessary Firebase services
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk-4jBZw5sYZprY9Xek7MWJejNQEed1lo",
  authDomain: "admin-e29c0.firebaseapp.com",
  databaseURL: "https://admin-e29c0-default-rtdb.firebaseio.com/", // Add this line
  projectId: "admin-e29c0",
  storageBucket: "admin-e29c0.appspot.com", // Fix storageBucket URL
  messagingSenderId: "532389698317",
  appId: "1:532389698317:web:5f5d7322c4545458b9ae44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Export Firebase instances
export { db, auth };
