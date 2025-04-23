document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navSection = document.querySelector(".nav-section");
  if (hamburger && navSection) {
    hamburger.addEventListener("click", () => {
      navSection.classList.toggle("active");
    });
  }

  // Inject Account Dropdown
  const accountMenu = document.getElementById("accountMenu");
  const user = JSON.parse(localStorage.getItem("drip_user"));
  if (accountMenu) {
    accountMenu.innerHTML = user
      ? `<li class="dropdown">
           <a href="#" class="dropbtn">Account ▼</a>
           <ul class="dropdown-content">
             <li><a href="dashboard.html">Dashboard</a></li>
             <li><a href="profile.html">Profile</a></li>
             <li><a href="#" onclick="logout()">Logout</a></li>
           </ul>
         </li>`
      : `<li class="dropdown">
           <a href="#" class="dropbtn">Account ▼</a>
           <ul class="dropdown-content">
             <li><a href="login.html">Login</a></li>
             <li><a href="signup.html">Sign Up</a></li>
           </ul>
         </li>`;
  }

  // Desktop Dropdown Toggle
  document.querySelectorAll(".dropdown .dropbtn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const parent = btn.closest(".dropdown");
      document.querySelectorAll(".dropdown.open").forEach(d => {
        if (d !== parent) d.classList.remove("open");
      });
      parent.classList.toggle("open");
    });
  });

  // Close dropdowns on outside click
  document.addEventListener("click", e => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
    }
  });

  // Update cart count
  updateCartCount();
});

// Logout
function logout() {
  localStorage.removeItem("drip_user");
  window.location.href = "index.html";
}

// Cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.querySelectorAll("a[href='cart.html']").forEach(link => {
    link.textContent = `Cart (${cart.length})`;
  });
}
