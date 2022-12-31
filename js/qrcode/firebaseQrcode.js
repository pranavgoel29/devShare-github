// console.log(firebase)

const auth = firebase.auth();

const whenSignedIn3 = document.getElementById('whenSignedIn3');
const whenSignedIn4 = document.getElementById('whenSignedIn4');
const cardp = document.getElementById('cardp');
const btnBack = document.getElementById('btnBack');

const provider = new firebase.auth.GoogleAuthProvider();

auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn3.hidden = false;
        whenSignedIn4.hidden = false;
        // cardp.style = "margin: 20px 60px 20px 60px";
        btnBack.hidden = true;
    } else {
        btnBack.hidden = false;
        whenSignedIn3.hidden = true;
        // cardp.style = "margin: 20px 40px 20px 40px";
        whenSignedIn4.hidden = true;
    }
});

//This function runs everytime the auth state changes. Use to verify if the user is logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        
        console.log("USER LOGGED IN");
    } else {
        // No user is signed in.
        console.log("USER NOT LOGGED IN");
    }
});