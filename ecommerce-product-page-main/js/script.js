//! sidebar start

function sidebarFunc() {
  const btnOpenSidebar = document.querySelector("#btn-menu");
  const sidebar = document.querySelector("#sidebar");
  const closeSidebar = document.querySelector("#close-sidebar");

  btnOpenSidebar.addEventListener("click", function () {
    sidebar.style.right = "0";
    closeSidebar.style.display = "block";
  });

  closeSidebar.addEventListener("click", function () {
    sidebar.style.right = "-100%";
    closeSidebar.style.display = "none";
  });
}

sidebarFunc();

//! sidebar end

//! cart-container start

const btnCartContainer = document.querySelector(".profile-cart");
const cartCount = document.querySelector(".cart-count");
const cartContainer = document.querySelector("#cart-container");

cartCount.style.display = "none";

function cartToggleFunc() {
  cartContainer.classList.toggle("hidden");
}

btnCartContainer.addEventListener("click", cartToggleFunc);

//! cart-container end
