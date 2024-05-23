// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
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
const database = getDatabase(app);

function getFormattedDateTime() {

  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day}-${hour}-${minute}-${second}`;

  return formattedDateTime;
}