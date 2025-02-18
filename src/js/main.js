import productList from "./productList.mjs"; // Default function - Don't need  {} when importing
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

productList(".product-list", "tents");

