firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.

      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";

      var user = firebase.auth().currentUser;

      if (user != null) {
        var email_id = user.email;
        
        document.getElementById("user_para").innerHTML = "Welcome User: " + email_id;
      }

    } else {
      // No user is signed in.

      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
    }
  });


function login() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(user){ 
        window.location.href = "index.html";
    })
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error: " + errorMessage);
        // ...
      });

}

function signup() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    var userName = document.getElementById("username_field").value;
    var userCPass = document.getElementById("confirm_password_field").value;
    var firebaseRef = firebase.database();
    
    firebaseRef.ref('users/' + userName).set({
        email: userEmail,
    })

    if (userEmail != '' && userPass != '' && userCPass != '' ) {
        if (userPass == userCPass) {
            firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
            .then(function (user){
                window.location.href = "index.html";
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
        
                window.alert("Error: " + errorMessage);
              }); 
        } else {
            window.alert("Error: Passwords do not match");
        }
    }
}

function returnhome() {
    window.location.href="test_unauthorised.html";
}
