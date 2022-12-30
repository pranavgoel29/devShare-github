// console.log(firebase)

const auth = firebase.auth();

const signInBtn = document.getElementById('signInBtn');

const whenSignedIn = document.getElementById('whenSignedIn');
// const whenSignedIn2 = document.getElementById('whenSignedIn2');
const whenSignedOut = document.getElementById('whenSignedOut');

// const createThing = document.getElementById('createThing');
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
        userDetails.innerHTML = `<img style='padding: 20px; border-radius: 50%;' src=${user.photoURL} referrerpolicy="no-referrer"/><div>${user.displayName}</div>`;
        
    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
    }
});




const db = firebase.firestore();

let thingsRef;
let unsubscribe;

// const get = (param) => document.getElementById(`${param}`);

// var pdata = JSON.parse(sessionStorage.getItem("pdata"))

// console.log(pdata.login)

const renderUser = doc => {
    console.log(doc.data())
    const tr = `<p style='margin-top: 10px;' data-id='${doc.id}' >Handle: ${doc.data().login}<a href="./qr-code.html"><button style='margin-left: 10px;' class="btn btn-primary btn-qrcodeg">Generate QR</button></a><button style='margin-left: 10px;' class="btn btn-primary btn-delete">Remove from Favourite</button></p>`
    thingsList.insertAdjacentHTML('beforeend', tr);

    // Click Generate QR code
    const btnQrCode = document.querySelector(`[data-id='${doc.id}'] .btn-qrcodeg`);
    btnQrCode.addEventListener('click', () => {
        sessionStorage.setItem("pdata", JSON.stringify(doc.data()));
    })

    // Click delete user
    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
        db.collection('favourites').doc(`${doc.id}`).delete().then(() => {
            console.log('Document succesfully deleted!');
        }).catch(err => {
            console.log('Error removing document', err);
        });
    });

}


auth.onAuthStateChanged(user => {
    if (user) {
        thingsRef = db.collection('favourites')

        // Query
        unsubscribe = thingsRef
            .where('uid', '==', user.uid)
            .orderBy('login') // Requires a query
            .onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        renderUser(change.doc);
                    }
                    if (change.type === 'removed') {
                        console.log(change.doc.id)
                        let tr = document.querySelector(`[data-id='${change.doc.id}']`);
                        tr.remove()
                    }
                })
            });

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