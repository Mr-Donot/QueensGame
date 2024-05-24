import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmqcJVph_jsTZVBCt2tChGFlqia6jB-o4",
  authDomain: "test-queens-game.firebaseapp.com",
  databaseURL: "https://test-queens-game-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-queens-game",
  storageBucket: "test-queens-game.appspot.com",
  messagingSenderId: "423803906034",
  appId: "1:423803906034:web:d2804f284c0175874f2d6b",
  measurementId: "G-9L5RKZ5P2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const db = getDatabase(app);
const auth = getAuth(app);


if (auth.currentUser) {
    // User is signed in, get user details
    console.log("User ID: " + user.uid);
    console.log("User Email: " + user.email);
    // You can display this information on your page
    //document.getElementById("user-info").textContent = `Logged in as: ${user.email}`;
} else {
    // No user is signed in
    console.log("No user is signed in.");
    console.log(auth);
    // Redirect to login page or show a message
    //window.location.href = "./auth.html"; // Redirect to login page if not logged in
}
