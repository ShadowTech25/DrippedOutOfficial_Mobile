// script.js — Full site logic: nav, cart, profile, slider & shop filtering, dropdowns

document.addEventListener("DOMContentLoaded", () => {
  // 1) Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navSection = document.querySelector(".nav-section");
  if (hamburger && navSection) {
    hamburger.addEventListener("click", () => {
      navSection.classList.toggle("active");
    });
  }

  // 2) Inject Account Menu
  const accountMenu = document.getElementById("accountMenu");
  const user = JSON.parse(localStorage.getItem("drip_user"));
  if (accountMenu) {
    accountMenu.innerHTML = user
      ? `<li class="dropdown">
           <a href="#" class="dropbtn">Account <span class="arrow">▼</span></a>
           <ul class="dropdown-content">
             <li><a href="dashboard.html">Dashboard</a></li>
             <li><a href="profile.html">Profile</a></li>
             <li><a href="#" onclick="logout()">Logout</a></li>
           </ul>
         </li>`
      : `<li class="dropdown">
           <a href="#" class="dropbtn">Account <span class="arrow">▼</span></a>
           <ul class="dropdown-content">
             <li><a href="login.html">Login</a></li>
             <li><a href="signup.html">Sign Up</a></li>
           </ul>
         </li>`;
  }

  // 3) Mobile Dropdown Toggle (≤768px)
  document.querySelectorAll(".nav-links > li, .account-links > li").forEach(parent => {
    const link = parent.querySelector("a");
    const dropdown = parent.querySelector(".dropdown, .dropdown-content");
    if (dropdown && link) {
      link.addEventListener("click", e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          parent.classList.toggle("active");
        }
      });
    }
  });

  // 3a) Desktop Dropdown Toggle (>768px)
  document.querySelectorAll(".nav-links > li.dropdown, .account-links > li.dropdown")
    .forEach(parent => {
      const btn = parent.querySelector(".dropbtn");
      if (btn) {
        btn.addEventListener("click", e => {
          e.preventDefault();
          // Close others
          document
            .querySelectorAll(".nav-links li.dropdown.open, .account-links li.dropdown.open")
            .forEach(other => { if (other !== parent) other.classList.remove("open"); });
          parent.classList.toggle("open");
        });
      }
    });

  // 3b) Click outside to close dropdowns
  document.addEventListener("click", e => {
    if (!e.target.closest(".dropdown")) {
      document
        .querySelectorAll(".nav-links li.dropdown.open, .account-links li.dropdown.open")
        .forEach(d => d.classList.remove("open"));
    }
  });

  // 4) Cart & Product Buttons
  updateCartCount();
  if (document.querySelector(".buy-button")) setupCartButtons();

  // 5) FAQ Toggle
  document.querySelectorAll(".faq").forEach(faq =>
    faq.addEventListener("click", () => faq.classList.toggle("active"))
  );

  // 6) Shop filter
  const categorySelect = document.getElementById("categorySelect");
  if (categorySelect) {
    categorySelect.addEventListener("change", filterProducts);
    filterProducts();
  }

  // 7) Slider setup
  fitSliderCards();
  initSliderControls();
  enableDragScroll();
});

// —— Global Functions ——

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
    const btn = card.querySelector("button");
    const inCart = cart.find(item => item.name === name);
    if (btn) {
      btn.textContent = inCart ? "Remove from Cart" : "Add to Cart";
      btn.onclick = () =>
        inCart ? removeFromCartByName(name) : addToCartFromCard(card);
    }
  });
}

function setupCartButtons() {
  updateProductButtons();
}

function filterProducts() {
  const sel = document.getElementById("categorySelect").value;
  document.querySelectorAll(".product-card").forEach(card => {
    card.style.display =
      sel === "All" || card.dataset.category === sel ? "" : "none";
  });
}

function fitSliderCards() {
  const s = document.querySelector(".product-slider");
  if (!s) return;
  const w = s.clientWidth;
  s.querySelectorAll(".product-card").forEach(c => {
    c.style.minWidth = `${w}px`;
  });
}

function initSliderControls() {
  const slider = document.querySelector(".product-slider");
  if (!slider) return;
  const slides = slider.querySelectorAll(".product-card");
  let idx = 0;

  const prev = document.createElement("button");
  prev.className = "slider-btn prev";
  prev.innerHTML = "&#10094;";
  const next = document.createElement("button");
  next.className = "slider-btn next";
  next.innerHTML = "&#10095;";

  slider.style.position = "relative";
  slider.appendChild(prev);
  slider.appendChild(next);

  function go(i) {
    slider.scrollTo({ left: i * slider.clientWidth, behavior: "smooth" });
    idx = i;
  }
  prev.addEventListener("click", () =>
    go((idx - 1 + slides.length) % slides.length)
  );
  next.addEventListener("click", () => go((idx + 1) % slides.length));

  setInterval(() => go((idx + 1) % slides.length), 5000);
}

function enableDragScroll() {
  const slider = document.querySelector(".product-slider");
  if (!slider) return;
  let down = false,
    startX,
    scr;
  slider.style.cursor = "grab";
  slider.addEventListener("mousedown", e => {
    down = true;
    slider.classList.add("dragging");
    startX = e.pageX - slider.offsetLeft;
    scr = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    down = false;
    slider.classList.remove("dragging");
  });
  slider.addEventListener("mouseup", () => {
    down = false;
    slider.classList.remove("dragging");
  });
  slider.addEventListener("mousemove", e => {
    if (!down) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scr - walk;
  });
}

window.addEventListener("resize", fitSliderCards);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .catch(e => console.error(e));
}
