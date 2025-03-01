import { loadProductDetails } from "./productDetails.mjs";
import { getParam } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter(); // Load header and footer

const productId = getParam("product");

loadProductDetails(productId);

let btn = document.querySelector("#addToCart");

btn.addEventListener("click", () => {
  btn.classList.toggle("clicked");
});
