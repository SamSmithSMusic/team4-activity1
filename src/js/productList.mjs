// Import necessary functions from other files
import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a>
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

    // get the element we will insert the list into from the selector
    const el = document.querySelector(selector);

     // Fetch data
    const products = await getData(category);

    // Use map() and filter() to get only the 4 tents
    const selectedTents = getSelectedTents(products);

    // Render product list
    renderListWithTemplate(productCardTemplate, el, selectedTents);

}