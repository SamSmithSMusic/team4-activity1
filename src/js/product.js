import {loadProductDetails} from "./productDetails.mjs";
import {getParam} from "./utils.mjs";

const productId = getParam("product");

loadProductDetails(productId)