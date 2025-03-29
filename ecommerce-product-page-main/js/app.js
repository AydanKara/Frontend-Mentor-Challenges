import {
  handleMobileMenu,
  handleQuantityButtons,
  handleGalleryThumbs,
  handleKeyDown,
  handleMobileSlider,
} from "./events.js";
import { handleLightbox } from "./lightbox.js";
import { handleCart } from "./cart.js";

// Initialize all functions
function init() {
  handleMobileMenu();
  handleGalleryThumbs();
  handleMobileSlider();
  handleQuantityButtons();
  handleLightbox();
  handleCart();
  handleKeyDown();
}

document.addEventListener("DOMContentLoaded", init);
