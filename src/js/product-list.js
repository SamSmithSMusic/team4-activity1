/* eslint-disable no-debugger */
import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
productList(".product-list", category);
