document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("btn-menu");
  const closeButton = document.getElementById("btn-close");
  const sidebar = document.getElementById("sidebar");

  // Function to open menu
  function openMenu() {
    sidebar.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
  }

  // Function to close menu
  function closeMenu() {
    sidebar.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }

  // Event Listeners
  menuButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });

  // Close menu on "Escape" key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
});
