const footerHTML = `
  <footer class="section-footer">
    <div class="footer-container container">
      <div class="content_1">
        <div class="logo-font">E-Store</div>
        <p>
          Welcome to EStore, your ultimate destination for
          cutting-edge gadgets!
        </p>
        <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="cards" />
      </div>
      <div class="content_2">
        <h4>SHOPPING</h4>
        <a href="#">Computer Store</a>
        <a href="#">Laptop Store</a>
        <a href="#">Accessories</a>
        <a href="#">Sales & Discount</a>
      </div>
      <div class="content_3">
        <h4>Experience</h4>
        <a href="./contact.html">Contact Us</a>
        <a href="#">Payment Method</a>
        <a href="#">Delivery</a>
        <a href="#">Return and Exchange</a>
      </div>
      <div class="content_4">
        <h4>NEWSLETTER</h4>
        <p>Be the first to know about new<br/>arrivals, sales & promos!</p>
        <div class="f-mail">
          <input type="email" id="emailid" autocomplete="on" placeholder="Enter Your Email" /><br/>
        </div>
        <hr/>
        <button id="subscribe-btn" class="subscribe-btn">Subscribe</button>
      </div>
    </div>
    <div class="f-design">
      <div class="f-design-txt">
        <p>&copy; E - Store | E - Commerce | All Rights Reserved</p>
      </div>
    </div>
  </footer>`;

const footerElem = document.querySelector(".section-footer");
footerElem.insertAdjacentHTML("afterbegin", footerHTML);
