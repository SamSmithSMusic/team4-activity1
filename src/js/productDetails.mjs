import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

var product;

export async function loadProductDetails(productId) {
    product = await findProductById(productId);
    renderProductDetails();

    let cartButton = document.querySelector("#addToCart");
    // cartButton.addEventListener("click",addProductToCart(product))
    cartButton.addEventListener("click", () => addProductToCart());
    // This ensures that addProductToCart is only executed when the button is clicked
}

export function addProductToCart() {
  let cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

export function renderProductDetails() {
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
    document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}