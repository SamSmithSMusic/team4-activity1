import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import { applyDiscounts } from "./utils.mjs";

let product;

// Load product details
export async function loadProductDetails(productId) {
    product = await findProductById(productId);
    product = applyDiscounts([product])[0]; // Apply discount to the single product
    renderProductDetails();

    let cartButton = document.querySelector("#addToCart");
    // cartButton.addEventListener("click",addProductToCart(product))
    cartButton.addEventListener("click", () => addProductToCart());
    // This ensures that addProductToCart is only executed when the button is clicked
}

// Add product to cart
export function addProductToCart() {
  let cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

export function renderProductDetails() {
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryLarge;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;

    // Final Price (Red & Bold)
    const priceContainer = document.querySelector("#productFinalPrice");
    priceContainer.innerHTML = `<span class="final-price">$${product.FinalPrice.toFixed(2)}</span>`;

    // Display SALE Badge & List Price if applicable
  if (product.ListPrice !== product.FinalPrice) {
    document.querySelector("#saleBadge").style.display = "inline-block";
    document.querySelector("#productListPrice").style.display = "block";
    document.querySelector("#productListPrice").innerHTML = `<s>$${product.ListPrice.toFixed(2)}</s>`;
}

    document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}