import productList from "./productList.mjs"; // Default function - Don't need  {} when importing
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

productList(".product-list", "tents");

window.addEventListener("unhandledrejection", (event) => {
  alert(`Unhandled promise rejection: ${event.reason}`);
});

window.addEventListener("uncaughtException", (event) => {
  alert(`Uncaught exception: ${event.message}`);
});
