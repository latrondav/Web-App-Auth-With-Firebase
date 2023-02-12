import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDKd_QWLlXSgWGrTQPbh-6DGrQHd2N_4ck",
    authDomain: "web-app-auth-with-firebase.firebaseapp.com",
    databaseURL: "https://web-app-auth-with-firebase-default-rtdb.firebaseio.com",
    projectId: "web-app-auth-with-firebase",
    storageBucket: "web-app-auth-with-firebase.appspot.com",
    messagingSenderId: "410265617983",
    appId: "1:410265617983:web:1f128efd02418ae33c9a8a"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const signup = document.getElementById('signup');
if (signup) {
    signup.addEventListener('click', (e) => {
        var firstname = document.getElementById('firstname').value;
        var lastname = document.getElementById('lastname').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                set(ref(database, 'users/' + user.uid), {
                    firstname: firstname,
                    lastname: lastname,
                    email: email
                });

                alert('User Created');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    });
}

const login = document.getElementById('login');
if (login) {
    login.addEventListener('click', (e) => {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                update(ref(database, 'users/' + user.uid), {
                    last_login: new Date().toString()
                })
                    .then(() => {
                        alert("Login Successfull");
                        window.location = "http://127.0.0.1:5500/home.html"
                    })
                    .catch((error) => {
                        const errorMessage = error.message;
                        alert(errorMessage);
                    });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});

const logout = document.getElementById('logout');
if (logout) {
    logout.addEventListener('click', (e) => {
        signOut(auth).then(() => {
            // Sign-out successful.
            alert('Logged Out Successfully');
            window.location = "http://127.0.0.1:5500/login.html";
        }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    });
}