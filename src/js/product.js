import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

// The current implementation overwrites the cart each time a product is added
// function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }

// Updated addProductCart function, avoiding overwrites
function addProductToCart(product) {
  let cart = getLocalStorage("so-cart"); // Retrieve cart from localStorage
  if (!Array.isArray(cart)) {
    cart = []; // If the cart is not an array, initialize it as an empty array
  }
  cart.push(product); // Add the product to the cart
  setLocalStorage("so-cart", cart); // Save the updated cart back to localStorage
}

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

async function addToCartHandler(e) {
  try {
    const product = await findProductById(e.target.dataset.id); // Fetch product data by ID
    addProductToCart(product); // Add product to the cart
    // console.log("Product added to cart:", product); // Debugging message
  } catch (error) {
    // console.error("Error in addToCartHandler:", error); // Error handling
  }
}
// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);

// Add event listener to the Add to Cart button (without try/catch):
document.getElementById("addToCart").addEventListener("click", async (e) => {
  await addToCartHandler(e); // Ensure asynchronous function is awaited
});
