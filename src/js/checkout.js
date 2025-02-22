import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter(); // Load header and footer

checkoutProcess.init("so-cart", ".checkout-summary");

// Ensure order summary updates on page load
document.addEventListener("DOMContentLoaded", function () {
  checkoutProcess.calculateItemSummary();
});

// Calculate totals after entering ZIP code
document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

// Handle form submission
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();

  // e.target would contain our form in this case
  checkoutProcess.checkout(e.target);

  // Clear the form after submission
  e.target.reset();
});
