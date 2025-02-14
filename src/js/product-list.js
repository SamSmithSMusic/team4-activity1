import productList from "./productList.mjs";
import {getParam} from "./utils.mjs";

//loadHeaderFooter(); ADD WHEN READY

const category = getParam("category");
productList(".product-list", category);

