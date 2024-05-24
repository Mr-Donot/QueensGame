// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get, set, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
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
const db = getDatabase(app);
const auth = getAuth(app);

document.querySelector("#button_register").addEventListener("click", register);
document.querySelector("#button_login").addEventListener("click", login);

async function register(){
    let name = document.getElementById("signup_name").value;
    let email = document.getElementById("signup_email").value;
    let password = document.getElementById("signup_password").value;

    if (!(validate_email(email) && validate_password(password) && validate_name(name))){
        return;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(async function(){
        let user = auth.currentUser;

        let user_data = {
            "name":name,
            "email":email,
            "last_login":getFormattedDateTime()
        }

        await set(ref(db, 'users/' + user.uid), user_data);
    })
    .catch(function(error){
        console.error(error);
    })

}

async function login() {
    let email = document.getElementById("signin_email").value;
    let password = document.getElementById("signin_password").value;
  
    if (!(validate_email(email) && validate_password(password))) {
      return
    }
    
    signInWithEmailAndPassword(auth, email, password)
    .then(async function(userCredential) {
      let user = auth.currentUser;
      console.log(user.name);
      let user_data = {
        "last_login" : getFormattedDateTime()
      }
      await update(ref(db, 'users/' + user.uid), user_data);
      var user_cred = userCredential.user;
      userCredential.username = user.name;
      // Store user information in local storage
      localStorage.setItem('user', JSON.stringify(user_cred));
      window.location = "./";
      console.log(user);
    })
    .catch(function(error) {
      console.error(error);
    })

}  


function validate_email(email){
    let reg = /^[^@]+@\w+(\.\w+)+\w$/;
    return reg.test(email);
}
function validate_password(password){
    if (password == null){
        return false;
    }
    if (password.length < 6){
        return false;
    }
    return true;
}
function validate_name(name){
    if (name == null){
        return false;
    }
    if (name.length < 3){
        return false;
    }
    return true;
}

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