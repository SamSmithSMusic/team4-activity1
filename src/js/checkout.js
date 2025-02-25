import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter(); // Load header and footer

checkoutProcess.init("so-cart", ".checkout-summary");

// Ensure order summary updates on page load
document.addEventListener("DOMContentLoaded", function () {
  checkoutProcess.calculateItemSummary();
});

// Calculate totals after entering ZIP code
document.querySelector("#zip").addEventListener("blur", () => {
  const requiredFields = ["fname", "lname", "street", "city", "state", "zip"];
  const form = document.forms["checkout"];
  let allFilled = requiredFields.every(
    (field) => form[field].value.trim() !== ""
  );

  if (allFilled) {
    checkoutProcess.calculateOrdertotal();
  } else {
    throw new Error("Please fill in all shipping fields to display totals.");
  }
});

// Handle form submission
document.forms["checkout"].addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await checkoutProcess.checkout(e.target);
  } catch (error) {
    throw new Error(`Checkout Failed: ${error.message}`);
  }

  // Clear the form after submission
  e.target.reset();
});
