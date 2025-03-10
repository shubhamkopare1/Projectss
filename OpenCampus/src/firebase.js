
// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getDatabase, ref, onValue, update, push, set } from "firebase/database";

// Firebase Configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBWYWHwsyp5mdyPtB-0qpGsoeBFIu2IOAE",
//   authDomain: "collage-leave.firebaseapp.com",
//   databaseURL: "https://collage-leave-default-rtdb.firebaseio.com/",
//   projectId: "collage-leave",
//   storageBucket: "collage-leave.appspot.com",
//   messagingSenderId: "906714296603",
//   appId: "1:906714296603:web:647d508401a397bebb23be"
// };


// const app = initializeApp(firebaseConfig);


// const auth = getAuth(app);
// const db = getDatabase(app);


// export { auth, db, ref, onValue, update, push, set, onAuthStateChanged };

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, push, onValue, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBWYWHwsyp5mdyPtB-0qpGsoeBFIu2IOAE",
  authDomain: "collage-leave.firebaseapp.com",
  databaseURL: "https://collage-leave-default-rtdb.firebaseio.com/",
  projectId: "collage-leave",
  storageBucket: "collage-leave.appspot.com",
  messagingSenderId: "906714296603",
  appId: "1:906714296603:web:647d508401a397bebb23be"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Export Firebase app instance and services
export { app, auth, db, onAuthStateChanged, ref, set, push, onValue, update };
