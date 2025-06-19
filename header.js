const headerHTML = `
<header class="section-navbar">
    <!-- Navbar First -->
    <section class="top_txt">
      <div class="head container">
        <div class="head_txt">
          <p>Free shipping, 30-day return or refund guarantee.</p>
        </div>
        <div class="sing_in_up">
          <a href="signIn.html">SIGN IN</a>
          <a href="signUp.html">SIGN UP AS CUSTOMER</a>
          <a href="become-seller.html">SIGN UP AS SELLER</a>
        </div>
      </div>
    </section>

    <!-- Navbar -->
    <div class="navbar-container">
      <!-- E Store Logo Navbar -->
      <div class="navbar-brand">
        <a href="index.html">
          <div class="logo-font-head">E-Store</div>
        </a>
      </div>

      <!-- Navbar List -->
      <nav class="navbar">
        <ul>
          <li class="nav-item">
            <a href="/" class="nav-link">Home</a>
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
          <li class="nav-item">
            <div class="dropdown">
              <a href="#dropdownMenu" class="dropdown-toggle">
                  Gadgets
                  <i class="fa-solid fa-chevron-down"></i>
              </a>
            
              <div class="dropdown-toggle">
                <div class="dropdown-menu" id="dropdownMenu">
                  <a href="product.html#mobiles">Mobile</a>
                  <a href="product.html#laptops">Laptop</a>
                  <a href="product.html#tv">Television</a>
                  <a href="product.html#headphone">Wireless Headphones</a>
                  <a href="product.html#watches">Watches</a>
                  <a href="product.html#speakers">Speakers</a>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a href="signIn.html" class="nav-link add-to-cart-button" id="cartValue">
              <i class="fa-solid fa-cart-shopping"> 0 </i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>`;

const headerElem = document.querySelector(".section-navbar");
headerElem.insertAdjacentHTML("afterbegin", headerHTML);
