import "./style.css";
import products from "./api/products.json";
import { showProductContainer } from "./homeProductCards";
showProductContainer(products);

// // main.js (Updated to fetch from Firebase Realtime Database instead of local JSON)
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
// import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// // Firebase Configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCGl4Z5-FG_koWRqM3g1efU6gZbEH58JZU",
//   authDomain: "e-store-a77e0.firebaseapp.com",
//   databaseURL: "https://e-store-a77e0-default-rtdb.firebaseio.com",
//   projectId: "e-store-a77e0",
//   storageBucket: "e-store-a77e0.firebasestorage.app",
//   messagingSenderId: "812517838812",
//   appId: "1:812517838812:web:b32c67be2eb49cdae64919"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// const auth = getAuth(app);

// // Check if user is logged in
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in
//         document.getElementById("nav-profile").style.display = "block";
//         document.getElementById("nav-login").style.display = "none";
//     } else {
//         // User is signed out
//         document.getElementById("nav-profile").style.display = "none";
//         document.getElementById("nav-login").style.display = "block";

//         // If on a protected page, redirect to index.html
//         if (window.location.pathname.includes("dashboard") ||
//             window.location.pathname.includes("new-product") ||
//             window.location.pathname.includes("user-profile")) {
//             window.location.href = "index.html";
//         }
//     }
// });

// // Optional: Prevent back navigation to secure pages after logout
// window.addEventListener("pageshow", function (event) {
//     if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
//         window.location.reload();
//     }
// });

// // Logout button event
// const logoutBtn = document.getElementById("logoutBtn");
// if (logoutBtn) {
//     logoutBtn.addEventListener("click", () => {
//         signOut(auth).then(() => {
//             alert("Logged out successfully");
//             window.location.href = "index.html";
//         });
//     });
// }

// // Fetch product data from Firebase and display
// const productRef = ref(database, "products");
// onValue(productRef, (snapshot) => {
//     if (snapshot.exists()) {
//         const productData = Object.values(snapshot.val());
//         showProductContainer(productData);
//     } else {
//         console.log("No data available");
//     }
// });
