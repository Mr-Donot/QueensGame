
function register(){
    let name = document.getElementById("signup_name").value;
    let email = document.getElementById("signup_email").value;
    let password = document.getElementById("signup_password").value;

    if (!(validate_email(email) && validate_password(password) && validate_name(name))){
        return;
    }

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