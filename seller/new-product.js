import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

const newProductForm = document.getElementById("newProductForm");
const imageInput = document.getElementById("image");

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please login as seller.");
    window.location.href = "../index.html";
    return;
  }

  newProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const productId = document.getElementById("productId").value.trim();
    const productName = document.getElementById("productName").value.trim();
    const category = document.getElementById("category").value.trim();
    const brand = document.getElementById("brand").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);
    const description = document.getElementById("description").value.trim();
    const sellerName = document.getElementById("sellerName").value.trim();

    let imageBase64 = "";
    if (imageInput.files.length > 0) {
      imageBase64 = await toBase64(imageInput.files[0]);
    }

    const productData = {
      id: productId,
      name: productName,
      category,
      brand,
      price,
      stock,
      image: imageBase64,
      description,
      sellerName
    };

    // Store under sellers/{uid}/products/
    const productsRef = ref(db, `seller/${user.uid}/products`);
    await push(productsRef, productData);

    alert("Product added successfully!");
    newProductForm.reset();
  });
});