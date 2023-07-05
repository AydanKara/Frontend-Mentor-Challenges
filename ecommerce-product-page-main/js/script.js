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

function thumbsActiveFunc() {
  const thumbs = document.querySelectorAll(".gallery-thumbs .img-fluid");
  const singleImage = document.querySelector("#single-image");

  thumbs.forEach((item) => {
    item.addEventListener("click", function () {
      thumbs.forEach((image) => {
        image.classList.remove("active-opacity");
      });
      switch (item.getAttribute("src")) {
        case "./images/image-product-1-thumbnail.jpg":
          singleImage.src = "./images/image-product-1.jpg";
          break;
        case "./images/image-product-2-thumbnail.jpg":
          singleImage.src = "./images/image-product-2.jpg";
          break;
        case "./images/image-product-3-thumbnail.jpg":
          singleImage.src = "./images/image-product-3.jpg";
          break;
        case "./images/image-product-4-thumbnail.jpg":
          singleImage.src = "./images/image-product-4.jpg";
          break;
      }
      item.classList.add("active-opacity");
    });
  });
}

thumbsActiveFunc();

//! mobile slider start

const singleImage = document.getElementById("single-image");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
let currentImage = 1;

function nextImage() {
  if (currentImage === 4) {
    currentImage = 1;
  } else {
    currentImage++;
  }
  singleImage.src = `./images/image-product-${currentImage}.jpg`;
}

function previousImage() {
  if (currentImage === 1) {
    currentImage = 4;
  } else {
    currentImage--;
  }
  singleImage.src = `./images/image-product-${currentImage}.jpg`;
}

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", previousImage);

//! mobile slider end

//! lightbox slider start

function lightboxOpen() {
  const lightbox = document.querySelector(".lightbox");
  const closeLightbox = document.querySelector(".close-lightbox");

  singleImage.addEventListener("click", function () {
    lightbox.style.display = "flex";
  });
  closeLightbox.addEventListener("click", function () {
    lightbox.style.display = "none";
  });
}

lightboxOpen();

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("lightbox-product-img");
  const dots = document.querySelectorAll("#img-fluid-lightbox");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

//! increment and decrement buttons

const plusBtn = document.querySelector(".btn-plus");
const minusBtn = document.querySelector(".btn-minus");
const quantity = document.querySelector("#quantity");

let quantityValue = 0;

plusBtn.addEventListener("click", () => {
  quantityValue++;
  quantity.innerText = quantityValue;
});

minusBtn.addEventListener("click", () => {
  if (quantityValue > 0) {
    quantityValue--;
    quantity.innerText = quantityValue;
  }
});

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

//! add to cart start

const addToCartBtn = document.querySelector(".btn-add");
const emptyCartContent = document.querySelector(".cart-content");
const addedProduct = document.querySelector(".added-product");

addToCartBtn.addEventListener("click", () => {
  if (quantityValue > 0) {
    const totalPrice = 125 * quantityValue;
    emptyCartContent.classList.add("hidden");
    addedProduct.classList.remove("hidden");
    addedProduct.innerHTML = `
        <div class="product-content">
        <img src="./images/image-product-1-thumbnail.jpg" alt="product image">
        <div class="product-desc">
          <p class="product-name">Fall Limited Edition Sneakers</p>
          <p class="price">$125.00 x <span class="quantity">$${quantityValue}</span> <strong class="total">$${totalPrice.toFixed(
      2
    )}</strong>
          </p>
        </div>
        <button class="delete-btn" onclick="deleteProduct()"><img class="delete-img" src="./images/delete-product.svg"
            alt="delete product"></button>
      </div>
      <button class="checkout-btn">Checkout</button>
        `;
    cartCount.style.display = "flex";
    cartCount.innerText = quantityValue;
  }
});

//! add to cart end

//! delete item from cart

function deleteProduct() {
  addedProduct.classList.add("hidden");
  emptyCartContent.classList.remove("hidden");
  cartCount.style.display = "none";
}

//! delete item from end
