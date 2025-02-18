// Import necessary functions from other files
import { getData } from "./productData.mjs";
import { renderListWithTemplate, applyDiscounts } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      
      <!-- Display Sale Badge if applicable -->
      ${product.ListPrice !== product.FinalPrice ? 
          `<span class="sale-badge">Sale</span>` : ""}

      <!-- Display List Price with strikethrough if there is a discount -->
      ${product.ListPrice !== product.FinalPrice ? 
          `<p class="product-card__list-price"><s>$${product.ListPrice.toFixed(2)}</s></p>` : ""}
      
      <!-- Display Final Price in red and bold -->
      <p class="product-card__price final-price">$${product.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`;
}

// Filtering Function
function getSelectedTents(products) {
    const allowedIds = ["880RR", "985RF", "985PR", "344YJ"];

    return products
        .map(product => allowedIds.includes(product.Id) ? product : null) // Keep only selected tents
        .filter(product => product !== null); // Remove null values
}

// Main function to display the product list
export default async function productList(selector, category) {
  const el = document.querySelector(selector);
  let products = await getData(category);
  products = applyDiscounts(products); // Ensure discounts are applied
  const selectedTents = getSelectedTents(products);
  renderListWithTemplate(productCardTemplate, el, selectedTents);
}