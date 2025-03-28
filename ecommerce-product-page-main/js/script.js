// DOM Elements
const elements = {
  // Mobile menu and sidebar
  menuBtn: document.getElementById("btn-menu"),
  sidebar: document.getElementById("sidebar"),
  closeSidebar: document.getElementById("close-sidebar"),
  overlay: document.getElementById("overlay"),

  // Product gallery
  singleImage: document.getElementById("single-image"),
  galleryThumbs: document.querySelectorAll(".gallery-thumbs .img-fluid"),
  thumbButtons: document.querySelectorAll(".thumb-img"),
  nextBtn: document.getElementById("next"),
  prevBtn: document.getElementById("previous"),

  // Lightbox
  lightbox: document.querySelector(".lightbox"),
  closeLightbox: document.querySelector(".close-lightbox"),
  lightboxImages: document.querySelectorAll(".lightbox-product-img"),
  lightboxThumbs: document.querySelectorAll(".lightbox-thumb"),
  nextLightboxBtn: document.getElementById("next-lightbox"),
  prevLightboxBtn: document.getElementById("prev-lightbox"),

  // Quantity controls
  plusBtn: document.querySelector(".btn-plus"),
  minusBtn: document.querySelector(".btn-minus"),
  quantityDisplay: document.getElementById("quantity"),

  // Cart
  cartIconBtn: document.querySelector(".cart-icon-btn"),
  cartCount: document.querySelector(".cart-count"),
  cartContainer: document.getElementById("cart-container"),
  emptyCartContent: document.querySelector(".cart-content"),
  addedProduct: document.querySelector(".added-product"),
  addToCartBtn: document.querySelector(".btn-add-to-cart"),
};

// Product images mapping
const productImages = {
  thumbnails: [
    "./images/image-product-1-thumbnail.jpg",
    "./images/image-product-2-thumbnail.jpg",
    "./images/image-product-3-thumbnail.jpg",
    "./images/image-product-4-thumbnail.jpg",
  ],
  main: [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg",
  ],
};

// State
const state = {
  currentImageIndex: 0,
  lightboxActive: false,
  quantity: 0,
  cartOpen: false,
};

// Pure Functions
/**
 * Updates the active thumbnail in the gallery
 * @param {number} index - Index of the active thumbnail
 * @param {NodeList} thumbnails - Collection of thumbnail elements
 */
function updateActiveThumbnail(index, thumbnails) {
  thumbnails.forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add("active");
      const img = thumb.querySelector("img");
      if (img) img.classList.add("active-opacity");
    } else {
      thumb.classList.remove("active");
      const img = thumb.querySelector("img");
      if (img) img.classList.remove("active-opacity");
    }
  });
}

/**
 * Calculates the next image index
 * @param {number} current - Current index
 * @param {number} total - Total number of images
 * @param {number} step - Direction (-1 or 1)
 * @returns {number} - Next image index
 */
function getNextIndex(current, total, step) {
  const next = current + step;
  if (next < 0) return total - 1;
  if (next >= total) return 0;
  return next;
}

/**
 * Formats price for display
 * @param {number} price - Price value
 * @returns {string} - Formatted price string
 */
function formatPrice(price) {
  return price.toFixed(2);
}

/**
 * Creates cart item HTML
 * @param {Object} product - Product details
 * @param {number} quantity - Quantity of the product
 * @returns {string} - HTML string for the cart item
 */
function createCartItemHTML(product, quantity) {
  const totalPrice = product.price * quantity;

  return `
    <div class="product-content">
      <img src="${product.thumbnail}" alt="${product.name}">
      <div class="product-desc">
        <p class="product-name">${product.name}</p>
        <p class="price">$${formatPrice(
          product.price
        )} × ${quantity} <strong class="total">$${formatPrice(
    totalPrice
  )}</strong></p>
      </div>
      <button class="delete-btn" id="delete-product">
        <img class="delete-img" src="./images/delete-product.svg" alt="Delete product">
      </button>
    </div>
    <button class="checkout-btn">Checkout</button>
  `;
}

// Event Handlers
/**
 * Handles the mobile menu functionality
 */
function handleMobileMenu() {
  // Open sidebar
  elements.menuBtn.addEventListener("click", () => {
    elements.sidebar.style.left = "0";
    elements.overlay.style.display = "block";
    elements.menuBtn.setAttribute("aria-expanded", "false");
  });

  // Close sidebar
  elements.closeSidebar.addEventListener("click", () => {
    elements.sidebar.style.left = "-100%";
    elements.overlay.style.display = "none";
    elements.menuBtn.setAttribute("aria-expanded", "true");
  });

  // Close sidebar on overlay click
  elements.overlay.addEventListener("click", () => {
    elements.sidebar.style.left = "-100%";
    elements.overlay.style.display = "none";
    elements.menuBtn.setAttribute("aria-expanded", "true");
  });
}

/**
 * Handles gallery thumbnail click events
 */
function handleGalleryThumbs() {
  elements.thumbButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      state.currentImageIndex = index;
      elements.singleImage.src = productImages.main[index];
      updateActiveThumbnail(index, elements.thumbButtons);
    });
  });
}

/**
 * Handles mobile slider navigation
 */
function handleMobileSlider() {
  elements.nextBtn.addEventListener("click", () => {
    state.currentImageIndex = getNextIndex(
      state.currentImageIndex,
      productImages.main.length,
      1
    );
    elements.singleImage.src = productImages.main[state.currentImageIndex];
  });

  elements.prevBtn.addEventListener("click", () => {
    state.currentImageIndex = getNextIndex(
      state.currentImageIndex,
      productImages.main.length,
      -1
    );
    elements.singleImage.src = productImages.main[state.currentImageIndex];
  });
}

/**
 * Handles lightbox functionality
 */
function handleLightbox() {
  // Open lightbox on main image click
  elements.singleImage.addEventListener("click", () => {
    if (window.innerWidth >= 768) {
      // Only on desktop
      elements.lightbox.style.display = "flex";
      showLightboxSlide(state.currentImageIndex);
    }
  });

  // Close lightbox
  elements.closeLightbox.addEventListener("click", () => {
    elements.lightbox.style.display = "none";
  });

  // Lightbox navigation
  elements.nextLightboxBtn.addEventListener("click", () => {
    const nextIndex = getNextIndex(
      state.currentImageIndex,
      productImages.main.length,
      1
    );
    showLightboxSlide(nextIndex);
  });

  elements.prevLightboxBtn.addEventListener("click", () => {
    const prevIndex = getNextIndex(
      state.currentImageIndex,
      productImages.main.length,
      -1
    );
    showLightboxSlide(prevIndex);
  });

  // Lightbox thumbnail clicks
  elements.lightboxThumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      showLightboxSlide(index);
    });
  });
}

/**
 * Shows the specified slide in the lightbox
 * @param {number} index - Index of the slide to show
 */
function showLightboxSlide(index) {
  state.currentImageIndex = index;

  // Update main product image as well
  elements.singleImage.src = productImages.main[index];
  updateActiveThumbnail(index, elements.thumbButtons);

  // Update lightbox images
  elements.lightboxImages.forEach((img, i) => {
    img.style.display = i === index ? "block" : "none";
  });

  // Update lightbox thumbnails
  updateActiveThumbnail(index, elements.lightboxThumbs);
}

/**
 * Handles quantity selector buttons
 */
function handleQuantityButtons() {
  elements.plusBtn.addEventListener("click", () => {
    state.quantity++;
    elements.quantityDisplay.textContent = state.quantity;
  });

  elements.minusBtn.addEventListener("click", () => {
    if (state.quantity > 0) {
      state.quantity--;
      elements.quantityDisplay.textContent = state.quantity;
    }
  });
}

/**
 * Handles cart functionality
 */
function handleCart() {
  // Toggle cart dropdown
  elements.cartIconBtn.addEventListener("click", () => {
    const isOpen = elements.cartContainer.classList.contains("hidden");
    elements.cartContainer.classList.toggle("hidden");
    elements.cartIconBtn.setAttribute("aria-expanded", isOpen);
  });

  // Close cart when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInside =
      elements.cartContainer.contains(event.target) ||
      elements.cartIconBtn.contains(event.target);

    if (
      !isClickInside &&
      !elements.cartContainer.classList.contains("hidden")
    ) {
      const isOpen = elements.cartContainer.classList.contains("hidden");
      elements.cartContainer.classList.add("hidden");
      elements.cartIconBtn.setAttribute("aria-expanded", isOpen);
    }
  });

  // Add to cart
  elements.addToCartBtn.addEventListener("click", () => {
    if (state.quantity > 0) {
      const product = {
        name: "Fall Limited Edition Sneakers",
        price: 125.0,
        thumbnail: "./images/image-product-1-thumbnail.jpg",
      };

      // Update cart display
      elements.emptyCartContent.classList.add("hidden");
      elements.addedProduct.classList.remove("hidden");
      elements.addedProduct.innerHTML = createCartItemHTML(
        product,
        state.quantity
      );

      // Show cart count
      elements.cartCount.style.display = "flex";
      elements.cartCount.textContent = state.quantity;

      // Add delete functionality
      const deleteBtn = document.getElementById("delete-product");
      if (deleteBtn) {
        deleteBtn.addEventListener("click", deleteCartItem);
      }
    }
  });
}

/**
 * Removes item from cart
 */
function deleteCartItem() {
  elements.addedProduct.classList.add("hidden");
  elements.emptyCartContent.classList.remove("hidden");
  elements.cartCount.style.display = "none";
  state.quantity = 0;
  elements.quantityDisplay.textContent = state.quantity;
}

function handleKeyDown() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      // Close lightbox with escape
      elements.lightbox.style.display = "none";
      elements.cartContainer.classList.add("hidden");

      // Close sidebar with escape
      elements.sidebar.style.left = "-100%";
      elements.overlay.style.display = "none";
      elements.menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// Initialize all functions
function init() {
  handleMobileMenu();
  handleGalleryThumbs();
  handleMobileSlider();
  handleLightbox();
  handleQuantityButtons();
  handleCart();
  handleKeyDown();
}

// Start the application
document.addEventListener("DOMContentLoaded", init);
