import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter(); // Load header and footer

// Render the cart contents
function renderCartContents() {
  // Check if so-cart doesn't exist in localStorage before using .map()
  const cartItems = getLocalStorage("so-cart") || [];

  // If the array is empty, we display "Your cart is empty."
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Generate cart item HTML
function cartItemTemplate(item) {
  return `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
          <img src="${item.Image}" alt="${item.Name}" />
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

// Execute function to render cart
renderCartContents();
