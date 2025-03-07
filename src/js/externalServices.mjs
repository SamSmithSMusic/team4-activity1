// import { applyDiscounts } from "./utils.mjs";
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  console.log("Product data from API:", product.Result);
  return product.Result;
}

export async function checkout(payload) {
  const url = "http://server-nodejs.cit.byui.edu:3000/checkout";

  if (!payload) {
    throw new Error("Payload is empty");
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Server responded with ${response.status}: ${response.statusText}, Response: ${errorData}`);
  }

  return await response.json();
}
