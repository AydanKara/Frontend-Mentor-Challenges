import { elements } from "./elements.js";
import { state } from "./state.js";
import { productImages } from "./productData.js";
import { updateActiveThumbnail } from "./utils.js";

// Event Handlers
/**
 * Handles the mobile menu functionality
 */
export function handleMobileMenu() {
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
export function handleGalleryThumbs() {
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
export function handleMobileSlider() {
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
 * Handles quantity selector buttons
 */
export function handleQuantityButtons() {
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
 * Handles keydown events
 */
export function handleKeyDown() {
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
