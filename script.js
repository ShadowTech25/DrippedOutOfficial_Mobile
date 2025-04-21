// script.js - Updated with cart counter, add/remove logic, points system

// Toggle hamburger const hamburger = document.querySelector(".hamburger"); const navSection = document.querySelector(".nav-section"); if (hamburger && navSection) { hamburger.addEventListener("click", () => { navSection.classList.toggle("active"); }); }

// Account Menu const accountMenu = document.getElementById("accountMenu"); const user = JSON.parse(localStorage.getItem("drip_user")); if (accountMenu) { if (user) { accountMenu.innerHTML =  <li><a href="#">Account</a> <ul class="dropdown"> <li><a href="dashboard.html">Dashboard</a></li> <li><a href="profile.html">Profile</a></li> <li><a href="#" onclick="logout()">Logout</a></li> </ul> </li>; } else { accountMenu.innerHTML =  <li><a href="#">Account</a> <ul class="dropdown"> <li><a href="login.html">Login</a></li> <li><a href="signup.html">Sign Up</a></li> </ul> </li>; } } function logout() { localStorage.removeItem("drip_user"); window.location.href = "index.html"; }

// Show cart count in navbar function updateCartCount() { const cart = JSON.parse(localStorage.getItem("cart")) || []; const cartLinks = document.querySelectorAll("a[href='cart.html']"); cartLinks.forEach(link => { link.textContent = Cart (${cart.length}); }); }

// Add or Remove from Cart function addToCartFromCard(card) { const name = card.querySelector('h3')?.textContent; const price = card.querySelector('.price')?.textContent; const image = card.querySelector('img')?.src; const cart = JSON.parse(localStorage.getItem("cart")) || [];

const exists = cart.find(item => item.name === name); if (exists) { alert("Item already in cart."); return; } cart.push({ name, price, image }); localStorage.setItem("cart", JSON.stringify(cart)); updateCartCount(); updateProductButtons(); }

function removeFromCart(index) { const cart = JSON.parse(localStorage.getItem("cart")) || []; cart.splice(index, 1); localStorage.setItem("cart", JSON.stringify(cart)); location.reload(); }

function removeFromCartByName(name) { let cart = JSON.parse(localStorage.getItem("cart")) || []; cart = cart.filter(item => item.name !== name); localStorage.setItem("cart", JSON.stringify(cart)); updateCartCount(); updateProductButtons(); }

function updateProductButtons() { const cart = JSON.parse(localStorage.getItem("cart")) || []; const cards = document.querySelectorAll('.product-card');

cards.forEach(card => { const name = card.querySelector('h3')?.textContent; const inCart = cart.find(item => item.name === name); const button = card.querySelector('button'); if (!button) return; if (inCart) { button.textContent = "Remove from Cart"; button.onclick = () => removeFromCartByName(name); } else { button.textContent = "Add to Cart"; button.onclick = () => addToCartFromCard(card); } }); }

function setupCartButtons() { updateCartCount(); updateProductButtons(); }

function renderCart(containerId, totalId, includeRemove = true) { const container = document.getElementById(containerId); const totalLabel = document.getElementById(totalId); const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (!container || !totalLabel) return;

container.innerHTML = ''; let total = 0;

if (cart.length === 0) { container.innerHTML = '<p>Your cart is empty.</p>'; totalLabel.textContent = ''; return; }

cart.forEach((product, index) => { const div = document.createElement("div"); div.className = "cart-card"; div.innerHTML = <img src="${product.image}" alt="${product.name}" /> <h3>${product.name}</h3> <p>${product.price}</p> ${includeRemove ?<button class="remove-button" onclick="removeFromCart(${index})">Remove</button>: ''}; container.appendChild(div); total += parseFloat(product.price.replace("$", "")); });

totalLabel.textContent = Total: $${total.toFixed(2)}; }

function loadPastOrders(containerId) { const orders = JSON.parse(localStorage.getItem("pastOrders")) || []; const container = document.getElementById(containerId); if (!container) return;

if (orders.length === 0) { container.innerHTML += "<p>No past purchases yet.</p>"; return; }

orders.reverse().forEach(order => { const div = document.createElement("div"); div.className = "order-block"; div.innerHTML = <h3>Order placed on ${order.date}</h3><div class="order-items"></div>; const itemWrap = div.querySelector(".order-items");

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

}); }

// Award points at checkout (run inside checkout page) function awardPoints() { const user = JSON.parse(localStorage.getItem("drip_user")); const cart = JSON.parse(localStorage.getItem("cart")) || []; let total = 0;

cart.forEach(p => { total += parseFloat(p.price.replace("$", "")); });

if (user) { user.points = (user.points || 0) + Math.floor(total); localStorage.setItem("drip_user", JSON.stringify(user)); } }

// Register service worker if ('serviceWorker' in navigator) { navigator.serviceWorker.register('service-worker.js') .then(() => console.log('Service Worker registered')) .catch(err => console.error('Service Worker error:', err)); }

