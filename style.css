/* style.css — Full Updated Styles */

/* Reset & Base */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #000; color: #FFF; font-family: Arial, sans-serif; line-height: 1.5; }
a, button { font-family: inherit; }

/* Global Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #000;
  border-bottom: 2px solid #FFD700;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #FFD700;
  text-decoration: none;
}

/* Nav Sections */
.nav-section { display: flex; gap: 2rem; align-items: center; }
.nav-links, .account-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  align-items: center;
}
.nav-links li a, .account-links li a {
  color: #FFF;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
}
.nav-links li a.active,
.nav-links li a:hover,
.account-links li a:hover {
  color: #FFD700;
}

/* Dropdown Menus */
.dropdown { position: relative; }
.dropbtn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}
.arrow { font-size: 0.75rem; }
.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background: #000;
  border: 1px solid #FFD700;
  border-radius: 4px;
  min-width: 150px;
  padding: 0.5rem 0;
  margin-top: 0.25rem;
  z-index: 1000;
}
.dropdown-content li a {
  display: block;
  padding: 0.5rem 1rem;
  color: #FFF;
}
.dropdown-content li a:hover {
  background: rgba(255,255,255,0.1);
}
.dropdown.open > .dropdown-content {
  display: block;
}

/* Hamburger (Mobile) */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}
.hamburger span {
  height: 3px;
  width: 25px;
  background: #FFF;
  border-radius: 2px;
}

/* Mobile Nav Behavior */
@media (max-width: 768px) {
  .hamburger { display: flex; }
  .nav-section {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    background: #000;
    width: 100%;
    padding: 1rem;
    gap: 1rem;
  }
  .nav-section.active { display: flex; }
  .nav-links, .account-links {
    flex-direction: column;
    gap: 0.5rem;
  }
  .dropdown-content {
    position: relative;
    border: none;
    box-shadow: none;
    width: 100%;
  }
}

/* <details> FAQ & Articles */
details {
  background: #111;
  border: 1px solid #FFD700;
  border-radius: 4px;
  margin: 1em 0;
  padding: 0.5em 1em;
}
summary {
  cursor: pointer;
  color: #FFD700;
  font-size: 1.1rem;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
summary::after {
  content: '▼';
  transition: transform 0.2s;
}
details[open] summary::after {
  transform: rotate(-180deg);
}
details p {
  margin-top: 0.75em;
  color: #FFF;
}

/* Slider on Index (mobile‐friendly) */
.product-slider {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1rem;
  padding: 1rem 0;
}
.product-slider .product-card {
  flex: 0 0 80%;
  scroll-snap-align: start;
  background: #111;
  border-radius: 8px;
  padding: 1rem;
}

/* Shop/Product Listing (full-width cards) */
.product-card {
  /* Only applies outside .product-slider */
  width: 100%;
  background: #111;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1rem;
}

/* Footer */
.site-footer {
  background: #111;
  text-align: center;
  padding: 2rem 1rem;
}
.site-footer a {
  color: #FFF;
  text-decoration: none;
  margin: 0 0.5rem;
}
.site-footer a:hover {
  text-decoration: underline;
}