```javascript
// script.js — Full Updated Mobile-Focused Logic

document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navSection = document.querySelector(".nav-section");
  if (hamburger && navSection) {
    hamburger.addEventListener("click", () => {
      navSection.classList.toggle("active");
    });
  }

  // Inject Account Menu
  const accountMenu = document.getElementById("accountMenu");
  const user = JSON.parse(localStorage.getItem("drip_user"));
  if (accountMenu) {
    accountMenu.innerHTML = user
      ? `<li><a href=\"dashboard.html\">Dashboard</a></li><li><a href=\"#\" onclick=\"logout()\">Logout</a></li>`
      : `<li><a href=\"login.html\">Login</a></li><li><a href=\"signup.html\">Sign Up</a></li>`;
  }

  // Dropdown Toggles (Shop & Account)
  document.querySelectorAll(".dropdown > .dropbtn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const parent = btn.parentElement;
      parent.classList.toggle("open");
    });
  });
});

// Logout Helper
function logout() {
  localStorage.removeItem("drip_user");
  window.location.href = "index.html";
}
