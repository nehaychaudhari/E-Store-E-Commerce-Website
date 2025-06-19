// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const database = getDatabase(app);

// Get form elements
const signUpForm = document.getElementById('signUpform');
const emailInput = document.getElementById('emailid');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const showPasswordCheckbox = document.getElementById('showpass');
const showConfirmPasswordCheckbox = document.getElementById('c-showpass');

// Email validation regex pattern
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Password validation function
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];
    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }
    if (!hasUpperCase) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!hasLowerCase) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!hasNumbers) {
        errors.push('Password must contain at least one number');
    }
    if (!hasSpecialChar) {
        errors.push('Password must contain at least one special character');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Show/Hide password functionality
showPasswordCheckbox.addEventListener('change', function () {
    passwordInput.type = this.checked ? 'text' : 'password';
});

showConfirmPasswordCheckbox.addEventListener('change', function () {
    confirmPasswordInput.type = this.checked ? 'text' : 'password';
});

// Form submission handler
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Email validation
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        alert('Password validation failed:\n' + passwordValidation.errors.join('\n'));
        return;
    }

    // Password matching validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user data in Realtime Database
        const userData = {
            email: email,
            role: "user",
            createdAt: new Date().toISOString()
        };


        try {
            // Create a reference to the user's data in the database
            const userRef = ref(database, 'users/' + user.uid + '/profile');

            // Set the user data
            await set(userRef, userData);

            // Success message
            alert('Customer Registration Successful!!!');

            // Redirect to sign in page
            window.location.href = 'signIn.html';
        } catch (dbError) {
            console.error("Database Error:", dbError);
            alert('Error saving user data. Please try again.');
        }
    } catch (error) {
        // Handle errors
        let errorMessage = 'An error occurred during registration.';
        console.log('Error: ', error);

        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already registered.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email/password accounts are not enabled.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your internet connection.';
                break;
        }

        alert(errorMessage);
    }
});
