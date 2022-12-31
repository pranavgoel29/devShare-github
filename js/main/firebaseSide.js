// console.log(firebase)

const auth = firebase.auth();

const signInBtn = document.getElementById('signInBtn');

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedIn2 = document.getElementById('whenSignedIn2');
const whenSignedIn3 = document.getElementById('whenSignedIn3');
const whenSignedIn4 = document.getElementById('whenSignedIn4');
const whenSignedOut = document.getElementById('whenSignedOut');

const createThing = document.getElementById('createThing');
const generateQr = document.getElementById('generateQr');
const thingsList = document.getElementById('thingsList');

const userDetails = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider();



signInBtn.onclick = () => {
    auth.signInWithPopup(provider);
    userDetails.hidden = '';
}

signOutBtn.onclick = () => {
    userDetails.hidden = true;
    auth.signOut();
}


auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        whenSignedIn2.hidden = false;
        whenSignedIn3.hidden = false;
        whenSignedIn4.hidden = false;
        createThing.style.backgroundColor = "#0079ff";
        createThing.style.color = "#fff";
        // createThing.style.fontSize = '1rem';
        // createThing.style.padding = '13px 24px';
        createThing.innerText = 'Add to Favourites';
        createThing.disabled = false;
        createThing.classList.remove('btncustomfire');
        generateQr.classList.remove('btncustomfire');
        // console.log(user)
        userDetails.innerText = `${user.displayName}`;
        
    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        whenSignedIn2.hidden = false;
        whenSignedIn3.hidden = true;
        whenSignedIn4.hidden = true;
        createThing.style.backgroundColor = "#4b6a9b";
        createThing.style.color = "#dcdcdc";
        createThing.style.cursor = 'default';
        createThing.classList.add('btncustomfire');
        generateQr.classList.add('btncustomfire');
        // createThing.style.fontSize = '1rem';
        // createThing.style.padding = '13px 17px';
        createThing.innerText += ' (disabled)';
        createThing.disabled = true;
    }
});




const db = firebase.firestore();

let thingsRef;
let unsubscribe;

auth.onAuthStateChanged(user => {
    if (user) {
        thingsRef = db.collection('favourites')
        createThing.onclick = () => {

            // const { serverTimestamp } = firebase.firestore.FieldValue;
            const get = (param) => document.getElementById(`${param}`);
            var pdata = JSON.parse(sessionStorage.getItem("pdata"))
            // console.log(thingsRef.where('favourite', '!=', pdata.login).get())
            // console.log(pdata)
            thingsRef.where('uid', '==', user.uid).where('login', '==', pdata.login).get().then(res => {
                console.log(res.size);
                if (res.size === 0) {
                    thingsRef
                        .add({
                            uid: user.uid,
                            login: pdata.login,
                            name: pdata.name,
                            html_url: pdata.html_url,
                            avatar_url: pdata.avatar_url
                        });
                }
            })


        }

    } else {
        // Unsubscribe when the user signs out
        unsubscribe && unsubscribe();
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