// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGl4Z5-FG_koWRqM3g1efU6gZbEH58JZU",
  authDomain: "e-store-a77e0.firebaseapp.com",
  databaseURL: "https://e-store-a77e0-default-rtdb.firebaseio.com",
  projectId: "e-store-a77e0",
  storageBucket: "e-store-a77e0.firebasestorage.app",
  messagingSenderId: "812517838812",
  appId: "1:812517838812:web:b32c67be2eb49cdae64919"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const form = document.getElementById('becomeSellerForm');
const emailInput = document.getElementById('emailid');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const showPasswordCheckbox = document.getElementById('showpass');
const showConfirmPasswordCheckbox = document.getElementById('c-showpass');

function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];
  if (password.length < minLength) errors.push(`Password must be at least ${minLength} characters long`);
  if (!hasUpperCase) errors.push('Password must contain at least one uppercase letter');
  if (!hasLowerCase) errors.push('Password must contain at least one lowercase letter');
  if (!hasNumbers) errors.push('Password must contain at least one number');
  if (!hasSpecialChar) errors.push('Password must contain at least one special character');

  return { isValid: errors.length === 0, errors };
}

showPasswordCheckbox.addEventListener('change', function () {
  passwordInput.type = this.checked ? 'text' : 'password';
});

showConfirmPasswordCheckbox.addEventListener('change', function () {
  confirmPasswordInput.type = this.checked ? 'text' : 'password';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    alert('Password validation failed:\n' + passwordValidation.errors.join('\n'));
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const sellerData = {
      email: email,
      role: 'seller',
      createdAt: new Date().toISOString()
    };

    const sellerRef = ref(database, 'seller/' + user.uid + '/profile');
    await set(sellerRef, sellerData);

    alert('Seller Registration Successful!!!');
    window.location.href = 'signIn.html';
  } catch (error) {
    let errorMessage = 'Registration error occurred.';
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already registered.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email format.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Weak password.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Check your connection.';
        break;
    }
    alert(errorMessage);
  }
});
