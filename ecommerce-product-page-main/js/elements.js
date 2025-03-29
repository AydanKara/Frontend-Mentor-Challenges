// DOM Elements
export const elements = {
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
