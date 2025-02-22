// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Get Product ID
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param)
}

// Template function to render a list into the DOM
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (!parentElement) {
    return; // Exit the function if parentElement is null or undefined
  }

  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

// Renders a template into a parent element
export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
  // Check if parentElement exists
  if (!parentElement) {
    throw new Error("Parent element is null or undefined");
  }

  // If clear is true, empty the parent element's content
  if (clear) {
      parentElement.innerHTML = "";
  }

  // Generate the template HTML using the provided template function
  const template = await templateFn(data);
  
  // Insert the template HTML into the parent element at the specified position
  parentElement.insertAdjacentHTML(position, template);
  
  // If a callback function is provided, execute it with the data
  if(callback) {
      callback(data);
  }
}

// Function that fetches and returns the HTML content of a template file
function loadTemplate(path) {
  // Return an async function (currying technique)
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
          const html = await res.text();
          return html;
      }
      throw new Error("Failed to load template");
  };
}

// loads the header and footer templates using loadTemplate, then renders them
export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");
  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
}

// Apply discounts dynamically based on product conditions
export function applyDiscounts(products) {
  return products.map(product => {
      let discount = 0;

      // Apply a 20% discount to item 985PR
      if (product.Id === "985PR") {
          discount = 0.20;
      }
      // Apply a 10% discount to all tents
      else if (product.Name.toLowerCase().includes("tent")) {
          discount = 0.10;
      }

      // If there's a discount, update ListPrice and FinalPrice
      if (discount > 0) {
          product.ListPrice = product.FinalPrice;
          product.FinalPrice = +(product.FinalPrice * (1 - discount)).toFixed(2);
      }

      return product;
  });
}

