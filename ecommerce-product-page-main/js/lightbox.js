import { elements } from "./elements.js";
import { state } from "./state.js";
import { productImages } from "./productData.js";
import { updateActiveThumbnail, getNextIndex } from "./utils.js";
/**
 * Handles lightbox functionality
 */
export function handleLightbox() {
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
