function logout() {
    
    firebase.auth().signOut().then(function() {

        window.location.href = "test_unauthorised.html";

        // Sign-out successful.
        }).catch(function(error) {
        // An error happened.
    });
}

function dashboard() {
    var user = firebase.auth().currentUser;

    if (user!= null) {
        user.providerData.forEach(function (profile) {
            window.alert("Email: " + profile.email);
        });
    }
}
