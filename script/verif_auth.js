document.addEventListener('DOMContentLoaded', (event) => {
  var user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    console.log('User is signed in:', user);
    // You can use user information here
  } else {
    console.log('No user is signed in');
    // Redirect to the login page or handle the case when the user is not signed in
  }
});