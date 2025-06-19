import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, get, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

const productList = document.getElementById("productList");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "../index.html";
    return;
  }
  const productsRef = ref(db, `seller/${user.uid}/products`);
  const snapshot = await get(productsRef);

  if (!snapshot.exists()) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  const products = snapshot.val();
  productList.innerHTML = "";

  Object.entries(products).forEach(([key, prod]) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${prod.image || ''}" alt="${prod.name}" class="product-img">
      <div class="product-info">
        <span class="product-category">${prod.category || ''}</span>
        <span class="product-name">${prod.name || ''}</span>
        <span class="product-price">₹${prod.price || '0.00'}</span>
      </div>
      <div class="product-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Edit button
    card.querySelector(".edit-btn").onclick = () => {
      window.location.href = `edit-product.html?id=${key}`;
    };

    // Delete button
    card.querySelector(".delete-btn").onclick = async () => {
      if (confirm("Are you sure you want to delete this product?")) {
        await remove(ref(db, `seller/${user.uid}/products/${key}`));
        card.remove();
      }
    };

    productList.appendChild(card);
  });
});