// file: script.js
$(document).ready(function(){
  //initialize the firebase app
  var config = {
    apiKey: "AIzaSyBU0jRo39Inic4uyVt8ldpEVyqc83oCKeY",
    authDomain: "nypcio-7528.firebaseapp.com",
    databaseURL: "https://nypcio-7528.firebaseio.com",
    projectId: "nypcio-7528",
    storageBucket: "nypcio-7528.appspot.com",
    messagingSenderId: "1020306735682"
  };
  firebase.initializeApp(config);

  //create firebase references
  var Auth = firebase.auth(); 
  var dbRef = firebase.database();
  var contactsRef = dbRef.ref('contacts')
  var usersRef = dbRef.ref('users')
  var auth = null;

  //Register
  $('#signupForm').on('submit', function (e) {
    e.preventDefault();
  
    var data = {
      username: $('#signup-username').val(),
      email: $('#signup-email').val(),
      password: $('#signup-password').val()
    };

    if( data.email != '' && passwords.password != ''){
      
        firebase.auth()
          .createUserWithEmailAndPassword(data.email, passwords.password)
          .then(function(user) {
            return user.updateProfile({
              displayName: data.username;
            })
          })
          .then(function(user){
            //now user is needed to be logged in to save data
            auth = user;
            //now saving the profile data
            usersRef.child(user.uid).set(data)
              .then(function(){
                console.log("User Information Saved:", user.uid);
              })
          })
          .catch(function(error){
            console.log("Error creating user:", error);
          });
      }
    
  });

  //Login
  $('#signinForm').on('submit', function (e) {
    e.preventDefault();

    if( $('#signin-email').val() != '' && $('#signin-password').val() != '' ){
      //login the user
      var data = {
        email: $('#signin-email').val(),
        password: $('#signin-password').val()
      };
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(function(authData) {
          auth = authData;
        })
        .catch(function(error) {
          console.log("Login Failed!", error);
        });
    }
  });

  $('#logout').on('click', function(e) {
    e.preventDefault();
    firebase.auth().signOut()
  });

});

function spanText(textStr, textClasses) {
  var classNames = textClasses.map(c => 'text-'+c).join(' ');
  return '<span class="'+classNames+'">'+ textStr + '</span>';
}