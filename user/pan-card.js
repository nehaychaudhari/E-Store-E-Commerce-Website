import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGl4Z5-FG_koWRqM3g1efU6gZbEH58JZU",
    authDomain: "e-store-a77e0.firebaseapp.com",
    databaseURL: "https://e-store-a77e0-default-rtdb.firebaseio.com",
    projectId: "e-store-a77e0",
    storageBucket: "e-store-a77e0.appspot.com",
    messagingSenderId: "812517838812",
    appId: "1:812517838812:web:b32c67be2eb49cdae64919"
};

// Firebase initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const panForm = document.getElementById("pan-form");
const panNumberInput = document.getElementById("panNumber");
const fullNameInput = document.getElementById("fullName");
const panFileInput = document.getElementById("panFile");

// Image preview element create kara
let previewImg = document.createElement("img");
previewImg.style.maxWidth = "200px";
previewImg.style.display = "block";
previewImg.style.marginTop = "10px";
panFileInput.parentNode.appendChild(previewImg);

// Helper: file to base64
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

// Auth state
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../index.html";
        return;
    }
    const uid = user.uid;
    const panRef = ref(db, `users/${uid}/pan`);

    // Retrieve & show existing data
    get(panRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            panNumberInput.value = data.panNumber || "";
            fullNameInput.value = data.fullName || "";
            if (data.panImage) {
                previewImg.src = data.panImage;
                previewImg.style.display = "block";
            } else {
                previewImg.style.display = "none";
            }
        }
    });

    // Image preview on file select
    panFileInput.addEventListener("change", async () => {
        if (panFileInput.files.length > 0) {
            const file = panFileInput.files[0];
            if (file.type === "image/jpeg") {
                const base64 = await toBase64(file);
                previewImg.src = base64;
                previewImg.style.display = "block";
            } else {
                alert("Only JPEG files are allowed.");
                panFileInput.value = "";
                previewImg.style.display = "none";
            }
        } else {
            previewImg.style.display = "none";
        }
    });

    // PAN Number validation: max 10 chars & always uppercase
    panNumberInput.addEventListener("input", () => {
        // Always uppercase
        panNumberInput.value = panNumberInput.value.toUpperCase();
        // Max 10 chars
        if (panNumberInput.value.length > 10) {
            panNumberInput.value = panNumberInput.value.slice(0, 10);
        }
    });

    // Form submit
    panForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const panNumber = panNumberInput.value.trim();
        const fullName = fullNameInput.value.trim();
        let panImage = "";

        if (panFileInput.files.length > 0) {
            const file = panFileInput.files[0];
            if (file.type !== "image/jpeg") {
                alert("Only JPEG files are allowed.");
                return;
            }
            panImage = await toBase64(file);
        } else if (previewImg.src) {
            panImage = previewImg.src;
        }

        // Save to database
        await set(panRef, {
            panNumber,
            fullName,
            panImage
        });

        alert("PAN Card Information Saved Successfully!");
    });
});
