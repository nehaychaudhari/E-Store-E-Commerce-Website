// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCGl4Z5-FG_koWRqM3g1efU6gZbEH58JZU",
    authDomain: "e-store-a77e0.firebaseapp.com",
    databaseURL: "https://e-store-a77e0-default-rtdb.firebaseio.com",
    projectId: "e-store-a77e0",
    storageBucket: "e-store-a77e0.firebasestorage.app",
    messagingSenderId: "812517838812",
    appId: "1:812517838812:web:b32c67be2eb49cdae64919"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Form submit handler
document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        alert('New passwords do not match!');
        return;
    }

    if (oldPassword === newPassword) {
        alert("Old password and new password cannot be the same. Please enter a different new password.");
        return;
    }

    const user = auth.currentUser;
    if (!user) {
        alert("You must be logged in to change your password.");
        return;
    }

    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
        await reauthenticateWithCredential(user, credential);
    } catch (error) {
        alert("Incorrect old password. Please try again.");
        return;
    }

    await updatePassword(user, newPassword);
    alert("Password updated successfully.");
    document.getElementById('changePasswordForm').reset();
});

// Show/Hide password functionality
const passwordInput = document.getElementById('oldPassword');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmNewPassword');
const showoldPasswordCheckbox = document.getElementById('showoldpass');
const showPasswordCheckbox = document.getElementById('showpass');
const showConfirmPasswordCheckbox = document.getElementById('c-showpass');

showoldPasswordCheckbox.addEventListener('change', function () {
    passwordInput.type = this.checked ? 'text' : 'password';
});

showPasswordCheckbox.addEventListener('change', function () {
    newPasswordInput.type = this.checked ? 'text' : 'password';
});

showConfirmPasswordCheckbox.addEventListener('change', function () {
    confirmPasswordInput.type = this.checked ? 'text' : 'password';
});