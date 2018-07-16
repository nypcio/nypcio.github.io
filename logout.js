function logout() {
    
    firebase.auth().signOut().then(function() {

        window.location.href = "test_unauthorised.html";

        // Sign-out successful.
        }).catch(function(error) {
        // An error happened.
    });
}
