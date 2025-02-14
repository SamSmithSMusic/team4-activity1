// Import necessary functions from other files
import { getProductsByCategory } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image.PrimaryMedium}"
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
    // console.log("Selector:", selector);
    // console.log("Category:", category);

    // get the element we will insert the list into from the selector
    const el = document.querySelector(selector);
    
    // Check if the selector exists in the HTML
    // console.log("Selected element:", el);

    // if (!el) {
    //     console.error("Error: Element not found for selector:", selector);
    //     return;
    // }

     // Fetch data
    // const products = await getData(category);
    const products = await getProductsByCategory(category);
    
    // console.log("Fetched products:", products);

    // if (!Array.isArray(products) || products.length === 0) {
    //     console.error("Error: No products found or data is not an array.");
    //     return;
    // }

    // Use map() and filter() to get only the 4 tents
    const selectedTents = getSelectedTents(products);
    // console.log("Selected tents:", selectedTents);

    // Render product list
    // console.log("Rendering products into:", el);
    renderListWithTemplate(productCardTemplate, el, selectedTents);
    // console.log("Product list rendering complete");
    document.querySelector(".title").innerHTML = category;
}