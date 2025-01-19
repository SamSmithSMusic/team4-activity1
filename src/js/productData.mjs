function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

// Current implementation does not handle potential errors
// export async function findProductById(id) {
//   const products = await getData();
//   return products.find((item) => item.Id === id);
// }

// Updated findProductById to ensure robust error handling
export async function findProductById(id) {
  try {
    const products = await getData();

    // Ensure products is an array
    if (!Array.isArray(products)) {
      throw new Error("Product data is invalid or not an array");
    }

    // Find product by ID
    const product = products.find((item) => item.Id === id);

    if (!product) {
      throw new Error(`Product with ID '${id}' not found`);
    }

    return product; // Return the found product
  } catch (error) {
    // console.error("Error fetching product:", error.message || error);
    throw error; // Re-throw the error to handle it in the caller
  }
}
