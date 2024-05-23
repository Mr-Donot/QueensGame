import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";



document.querySelector("#button_register").addEventListener("click", register);
document.querySelector("#button_login").addEventListener("click", login);

function register(){
    let name = document.getElementById("signup_name").value;
    let email = document.getElementById("signup_email").value;
    let password = document.getElementById("signup_password").value;

    if (!(validate_email(email) && validate_password(password) && validate_name(name))){
        return;
    }
    const auth = getAuth(app);
    auth.createUserWithEmailAndPassword(email, password)
    .then(function(){
        let user = auth.currentUser;
        let db_ref = database.ref();

        let user_data = {
            "name":name,
            "email":email,
            "password":password,
            "last_login":getFormattedDateTime()
        }

        db_ref.child("users/" + user.uid).set(user_data);
    })
    .catch(function(error){
        console.error(error);
    })

}

function login() {
    let email = document.getElementById("signin_email").value;
    let password = document.getElementById("signin_password").value;
  
    if (!(validate_email(email) && validate_password(password))) {
      return
    }
    const auth = getAuth(app);
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      let user = auth.currentUser
      let db_ref = database.ref()

      let user_data = {
        "last_login" : getFormattedDateTime()
      }
      db_ref.child('users/' + user.uid).update(user_data)  
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