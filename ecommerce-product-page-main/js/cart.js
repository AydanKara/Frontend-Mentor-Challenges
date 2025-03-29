import { elements } from "./elements.js";
import { state } from "./state.js";
import { formatPrice } from "./utils.js";
/**
 * Handles cart functionality
 */
export function handleCart() {
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
            )} x ${quantity} <strong class="total">$${formatPrice(
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
