import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUQVsiytOa9sTWrx_hYLMsvNWSQAmzIvs",
    authDomain: "add-doc-a227d.firebaseapp.com",
    projectId: "add-doc-a227d",
    storageBucket: "add-doc-a227d.appspot.com",
    messagingSenderId: "402883757497",
    appId: "1:402883757497:web:eea2cbc56f4578af2c6268"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    db,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    onSnapshot
};