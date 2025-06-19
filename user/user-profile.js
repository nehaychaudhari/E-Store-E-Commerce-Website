import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, deleteUser } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, update, remove, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCGl4Z5-FG_koWRqM3g1efU6gZbEH58JZU",
  authDomain: "e-store-a77e0.firebaseapp.com",
  databaseURL: "https://e-store-a77e0-default-rtdb.firebaseio.com",
  projectId: "e-store-a77e0",
  storageBucket: "e-store-a77e0.appspot.com",
  messagingSenderId: "812517838812",
  appId: "1:812517838812:web:b32c67be2eb49cdae64919"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const profileForm = document.getElementById("profileForm");
const profilePicInput = document.getElementById("profile-pic");
const unameInput = document.getElementById("uname");
const emailInput = document.getElementById("emailid");
const mobInput = document.getElementById("mobnumber");
const dobInput = document.getElementById("userdob");
const genderInput = document.getElementById("gender");
const deleteBtn = document.getElementById("deleteAccount");

// Disable future dates in DOB
const today = new Date().toISOString().split("T")[0];
dobInput.setAttribute("max", today);

// Restrict mobile number to 10 digits
mobInput.addEventListener("input", () => {
  if (mobInput.value.length > 10) {
    mobInput.value = mobInput.value.slice(0, 10);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const userRef = ref(db, `users/${uid}/profile`);

    // Prefill email
    emailInput.value = user.email;
    emailInput.disabled = true;

    // Load existing profile data
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        unameInput.value = data.name || "";
        mobInput.value = data.mobile || "";
        dobInput.value = data.dob || "";
        genderInput.value = data.gender || "";
        if (data.photoURL) {
          const img = document.getElementById("profile-pic-preview");
          if (img) img.src = data.photoURL;
        }
      }
    });

    profileForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = unameInput.value.trim();
      const mobile = mobInput.value.trim();
      const dob = dobInput.value;
      const gender = genderInput.value;

      // Read image as base64 string
      let photoURL = "";
      if (profilePicInput.files.length > 0) {
        const file = profilePicInput.files[0];
        photoURL = await toBase64(file);
      }

      const data = {
        email: user.email,
        name,
        mobile,
        dob,
        gender,
        photoURL // base64 string
      };

      await update(userRef, data);
      alert("Profile updated successfully");
    });

    deleteBtn.addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete your account?")) {
        try {
          const userRootRef = ref(db, `users/${user.uid}`);
          await remove(userRootRef);
          await deleteUser(user);
          alert("Account deleted successfully");
          window.location.href = "../index.html";
        } catch (error) {
          alert("Error deleting account: " + error.message);
        }
      }
    });
  } else {
    window.location.href = "../index.html";
  }
});

// Helper function: file to base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
