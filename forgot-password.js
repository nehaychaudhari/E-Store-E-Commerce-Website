// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent! Please check your email inbox.');
        document.getElementById('forgotPasswordForm').reset();
    } catch (error) {
        console.error("Reset error:", error);
        let message = "Failed to send reset email.";

        switch (error.code) {
            case 'auth/user-not-found':
                message = "No account found with this email.";
                break;
            case 'auth/invalid-email':
                message = "Please enter a valid email address.";
                break;
            case 'auth/network-request-failed':
                message = "Network error. Please check your connection.";
                break;
        }

        alert(message);
    }
});
