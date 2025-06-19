const sellerHeaderHTML = `
<header class="section-navbar">
  <div class="navbar-container">
    <!-- E Store Logo Navbar -->
    <div class="navbar-brand">
      <a href="seller-dashboard.html">
        <div class="logo-font-head">E-Store</div>
      </a>
    </div>

    <!-- Navbar List -->
    <nav class="navbar">
      <ul>
        <li class="nav-item">
          <a href="seller-dashboard.html" class="nav-link">Dashboard</a>
        </li>
        <li class="nav-item">
          <a href="profile.html" class="nav-link">Profile</a>
        </li>
        <li class="nav-item">
          <a href="new-product.html" class="nav-link">Add Product</a>
        </li>
        <li class="nav-item">
          <a href="manage-product.html" class="nav-link">Manage Products</a>
        </li>
        <li class="nav-item">
          <a href="../index.html" class="nav-link">Logout</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
`;

const headerElem = document.querySelector(".section-navbar");
headerElem.insertAdjacentHTML("afterbegin", sellerHeaderHTML);