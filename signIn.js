// // Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// // Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCGl4Z5-FG_koWRqM3g1efU6gZbEH58JZU",
    authDomain: "e-store-a77e0.firebaseapp.com",
    databaseURL: "https://e-store-a77e0-default-rtdb.firebaseio.com",
    projectId: "e-store-a77e0",
    storageBucket: "e-store-a77e0.firebasestorage.app",
    messagingSenderId: "812517838812",
    appId: "1:812517838812:web:b32c67be2eb49cdae64919"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const signInForm = document.getElementById('signinform');
const emailInput = document.getElementById('emailid');
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showpass');

showPasswordCheckbox.addEventListener('change', function () {
    passwordInput.type = this.checked ? 'text' : 'password';
});

signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const uid = user.uid;

        const sellerRef = ref(db, 'seller/' + uid + '/profile');
        const sellerSnap = await get(sellerRef);

        if (sellerSnap.exists() && sellerSnap.val().role === 'seller') {
            alert('Seller Login Successful');
            window.location.href = 'seller/seller-dashboard.html';
            return;
        }

        const userRef = ref(db, 'users/' + uid + '/profile');
        const userSnap = await get(userRef);
        if (userSnap.exists() && userSnap.val().role === 'user') {
            alert('Customer Login Successful');
            window.location.href = 'user/user-dashboard.html';
            return;
        }

        alert('Account role not recognized. Contact support.');
    } catch (error) {
        console.error('Login error:', error);
        alert('Incorrect Email or Password. Please try again.');
    }
});