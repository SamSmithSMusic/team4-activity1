import { getLocalStorage, loadHeaderFooter, qs } from "./utils.mjs";
const checkoutLinkBtn = document.getElementById("checkout-link");

loadHeaderFooter(); // Load header and footer

// Render the cart contents
function renderCartContents() {
  // Check if so-cart doesn't exist in localStorage before using .map()
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = qs(".product-list");

  // If the array is empty, we display "Your cart is empty."
  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    hideCartFooter();
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // Calculate and display the subtotal
  calculateAndDisplaySubtotal(cartItems);

  // Show the cart footer
  showCartFooter();
}

function hideCartFooter() {
  const cartFooter = qs(".cart-footer");
  cartFooter.classList.add("hide");
}

function showCartFooter() {
  const cartFooter = qs(".cart-footer");
  cartFooter.classList.remove("hide");
}

// Generate cart item HTML
function cartItemTemplate(item) {
  const imageSrc = item.Images.PrimarySmall;
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${imageSrc}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <!-- Final Price should be in red and bold -->
    <p class="cart-card__price final-price">$${item.FinalPrice.toFixed(2)}</p>
  </li>`;
}

// Function to calculate and display subtotal
function calculateAndDisplaySubtotal(cartItems) {
  const itemCountSpan = document.getElementById("item-count");
  const subtotalSpan = document.getElementById("subtotal");
  let total = 0;

  // Sum the final prices of all items in the cart
  cartItems.forEach((item) => {
    total += item.FinalPrice;
  });

  // Update the subtotal and item count in the HTML
  itemCountSpan.textContent = cartItems.length;
  subtotalSpan.textContent = total.toFixed(2);
}

if (checkoutLinkBtn) {
  checkoutLinkBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/checkout/";
  });
}

// Execute function to render cart
renderCartContents();
