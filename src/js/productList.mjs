// Import necessary functions from other files

import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate, applyDiscounts } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
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

// Main function to display the product list
export default async function productList(selector, category) {
  // Find the main element for the product list
  const el = document.querySelector(selector);
  if (!el) {
    return; // Exit if the main element is not found
  }

  // Fetch and process products
  let products = await getProductsByCategory(category);
  products = applyDiscounts(products); // Ensure discounts are applied

  // Render the product list
  renderListWithTemplate(productCardTemplate, el, products);

  // Update the title, if the element exists
  const titleElement = document.querySelector(".title");
  if (titleElement) {
    titleElement.textContent = category; // Using textContent for better security
  }
  // document.querySelector(".title").innerHTML = category;
}