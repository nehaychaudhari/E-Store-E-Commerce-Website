const headerHTML = `
<header class="section-navbar">
  <div class="navbar-container">
    <!-- E Store Logo Navbar -->
    <div class="navbar-brand">
      <a href="user-dashboard.html">
        <div class="logo-font-head">E-Store</div>
      </a>
    </div>

    <!-- Navbar List -->
    <nav class="navbar">
      <ul>
        <li class="nav-item">
          <a href="user-dashboard.html" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="about.html" class="nav-link">about</a>
        </li>
        <li class="nav-item">
          <a href="products.html" class="nav-link">products</a>
        </li>
        <li class="nav-item">
          <a href="contact.html" class="nav-link">contact</a>
        </li>
        
        <!-- Gadgets -->
        <li class="nav-item">
          <div class="dropdown">
            <a href="#dropdownMenu" class="dropdown-toggle">
              Gadgets
              <i class="fa-solid fa-chevron-down"></i>
            </a>

            <div class="dropdown-toggle">
              <div class="dropdown-menu" id="dropdownMenu">
                <a href="products.html#mobiles">Mobile</a>
                <a href="products.html#laptops">Laptop</a>
                <a href="products.html#tv">Television</a>
                <a href="products.html#headphone">Wireless Headphones</a>
                <a href="products.html#watches">Watches</a>
                <a href="products.html#speakers">Speakers</a>
              </div>
            </div>
          </div>
        </li>

        <!-- Profile -->
        <li class="nav-item">
          <div class="dropdown">
            <a href="#dropdownMenu" class="dropdown-toggle">
              Profile
              <i class="fa-solid fa-chevron-down"></i>
            </a>

            <div class="dropdown-toggle">
              <div class="dropdown-menu" id="dropdownMenu">
                <a href="user-profile.html">Personal Information</a>
                <a href="change-password.html">Change Password</a>
                <a href="my-order.html">My Orders</a>
                <a href="pan-card.html">PAN Card</a>
                <a href="manage-address.html">Manage Address</a>
                <a href="../index.html">LOGOUT</a>
              </div>
            </div>
          </div>
        </li>
        
        <li class="nav-item">
          <a href="addToCart.html" class="nav-link add-to-cart-button" id="cartValue">
            <i class="fa-solid fa-cart-shopping"> 0 </i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</header>`;

const headerElem = document.querySelector(".section-navbar");
headerElem.insertAdjacentHTML("afterbegin", headerHTML);
