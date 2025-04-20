// Hamburger nav
const hamburger = document.querySelector(".hamburger");
const navSection = document.querySelector(".nav-section");
if (hamburger && navSection) {
  hamburger.addEventListener("click", () => {
    navSection.classList.toggle("active");
  });
}

// Account menu
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
function logout() {
  localStorage.removeItem("drip_user");
  window.location.href = "index.html";
}

// Add to cart
function addToCartFromCard(card) {
  const name = card.querySelector('h3')?.textContent;
  const price = card.querySelector('.price')?.textContent;
  const image = card.querySelector('img')?.src;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart.`);
}
function setupCartButtons() {
  const buttons = document.querySelectorAll('.buy-button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      addToCartFromCard(card);
    });
  });
}

// Remove from cart
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// Render cart
function renderCart(containerId, totalId, includeRemove = true) {
  const container = document.getElementById(containerId);
  const totalLabel = document.getElementById(totalId);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!container || !totalLabel) return;

  container.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    totalLabel.textContent = '';
    return;
  }

  cart.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "cart-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      ${includeRemove ? `<button class="remove-button" onclick="removeFromCart(${index})">Remove</button>` : ''}
    `;
    container.appendChild(div);
    total += parseFloat(product.price.replace("$", ""));
  });

  totalLabel.textContent = `Total: $${total.toFixed(2)}`;
}

// Load past purchases
function loadPastOrders(containerId) {
  const orders = JSON.parse(localStorage.getItem("pastOrders")) || [];
  const container = document.getElementById(containerId);
  if (!container) return;

  if (orders.length === 0) {
    container.innerHTML += "<p>No past purchases yet.</p>";
    return;
  }

  orders.reverse().forEach(order => {
    const div = document.createElement("div");
    div.className = "order-block";
    div.innerHTML = `<h3>Order placed on ${order.date}</h3><div class="order-items"></div>`;
    const itemWrap = div.querySelector(".order-items");

    order.items.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "order-item";
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h4>${item.name}</h4>
        <p>${item.price}</p>
      `;
      itemWrap.appendChild(itemDiv);
    });

    container.appendChild(div);
  });
}

// PWA Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.error('Service Worker error:', err));
}
