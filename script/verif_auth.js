document.addEventListener('DOMContentLoaded', (event) => {
  var user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    console.log("logged in")
  } else {
    // Redirect to the login page or handle the case when the user is not signed in
    window.location = "./auth.html";
  }
});

