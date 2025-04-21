// script.js — Full updated script with account injection, mobile dropdowns, cart logic, FAQ toggles, and slider sizing

document.addEventListener("DOMContentLoaded", () => {
  // 1) Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navSection = document.querySelector(".nav-section");
  if (hamburger && navSection) {
    hamburger.addEventListener("click", () => {
      navSection.classList.toggle("active");
    });
  }

  // 2) Inject Account Menu BEFORE binding any dropdown handlers
  const accountMenu = document.getElementById("accountMenu");
  const user = JSON.parse(localStorage.getItem("drip_user"));
  if (accountMenu) {
    if (user) {
      accountMenu.innerHTML = `
        <li><a href="#">Account</a>
          <ul class="dropdown">
            <li><a href="dashboard.html">Dashboard</a></li>
            <li><a href="profile.html">Profile</a></li>
            <li><a href="#" onclick="logout()">Logout</a></li>
          </ul>
        </li>`;
    } else {
      accountMenu.innerHTML = `
        <li><a href="#">Account</a>
          <ul class="dropdown">
            <li><a href="login.html">Login</a></li>
            <li><a href="signup.html">Sign Up</a></li>
          </ul>
        </li>`;
    }
  }

  // 3) Mobile Dropdown Toggle (Shop + Account)
  document.querySelectorAll(".nav-links > li, .account-links > li").forEach(parent => {
    const link = parent.querySelector("a");
    const dropdown = parent.querySelector(".dropdown");
    if (dropdown && link) {
      link.addEventListener("click", e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          parent.classList.toggle("active");
        }
      });
    }
  });

  // 4) Cart & Product Logic
  updateCartCount();
  if (document.querySelector(".buy-button")) setupCartButtons();

  // 5) FAQ Toggles (About Page)
  document.querySelectorAll(".faq").forEach(faq =>
    faq.addEventListener("click", () => faq.classList.toggle("active"))
  );

  // 6) Initialize Slider Sizing
  fitSliderCards();
});

// Global utility functions

function logout() {
  localStorage.removeItem("drip_user");
  window.location.href = "index.html";
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.querySelectorAll("a[href='cart.html']").forEach(link => {
    link.textContent = `Cart (${cart.length})`;
  });
}

function addToCartFromCard(card) {
  const name = card.querySelector("h3")?.textContent;
  const price = card.querySelector(".price")?.textContent;
  const image = card.querySelector("img")?.src;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.find(item => item.name === name)) {
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateProductButtons();
  }
}

function removeFromCartByName(name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateProductButtons();
}

function updateProductButtons() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.querySelectorAll(".product-card").forEach(card => {
    const name = card.querySelector("h3")?.textContent;
    const button = card.querySelector("button");
    const inCart = cart.find(item => item.name === name);
    if (button) {
      button.textContent = inCart ? "Remove from Cart" : "Add to Cart";
      button.onclick = () =>
        inCart ? removeFromCartByName(name) : addToCartFromCard(card);
    }
  });
}

function setupCartButtons() {
  updateProductButtons();
}

function renderCart(containerId, totalId, includeRemove = true) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById(containerId);
  const totalLabel = document.getElementById(totalId);
  if (!container || !totalLabel) return;
  container.innerHTML = "";
  let total = 0;
  cart.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "cart-card";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      ${includeRemove ? `<button onclick="removeFromCart(${index})">Remove</button>` : ""}
    `;
    container.appendChild(item);
    total += parseFloat(product.price.replace("$", ""));
  });
  totalLabel.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function awardPoints() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const user = JSON.parse(localStorage.getItem("drip_user"));
  const total = cart.reduce((sum, p) => sum + parseFloat(p.price.replace("$", "")), 0);
  if (user) {
    user.points = (user.points || 0) + Math.floor(total);
    localStorage.setItem("drip_user", JSON.stringify(user));
  }
}

function loadPastOrders(containerId) {
  const container = document.getElementById(containerId);
  const orders = JSON.parse(localStorage.getItem("pastOrders")) || [];
  if (!container) return;
  if (orders.length === 0) {
    container.innerHTML = "<p>No past purchases yet.</p>";
    return;
  }
  orders.reverse().forEach(order => {
    const block = document.createElement("div");
    block.className = "order-block";
    block.innerHTML = `<h3>Order on ${order.date}</h3><div class="order-items"></div>`;
    order.items.forEach(item => {
      const row = document.createElement("div");
      row.className = "order-item";
      row.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h4>${item.name}</h4>
        <p>${item.price}</p>
      `;
      block.querySelector(".order-items").appendChild(row);
    });
    container.appendChild(block);
  });
}

// 7) Slider sizing logic
function fitSliderCards() {
  const slider = document.querySelector(".product-slider");
  if (!slider) return;
  const w = slider.clientWidth;
  slider.querySelectorAll(".product-card").forEach(card => {
    card.style.minWidth = `${w}px`;
  });
}

// Re-run on resize
window.addEventListener("resize", fitSliderCards);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .catch(err => console.error("Service Worker error:", err));
}
