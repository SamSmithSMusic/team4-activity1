import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

// Converts a form element's input fields into a JSON object
export function formDataToJSON(formElement) {
    // Converts a form element's input fields into a JSON object  
    const formData = new FormData(formElement);

    // Initialize an empty object to store form data
    const convertedJSON = {};

    // Iterate over each form field and store its value in the JSON object
    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    // Return the formatted JSON object containing form data
    return convertedJSON;
}

// Converts cart items into a simplified format required for the checkout process
function packageItems(items) {
    // Map through each item and create a simplified version
    return items.map((item) => ({
      id: item.Id,           // Product ID
      price: item.FinalPrice, // Product price
      name: item.Name,        // Product name
      quantity: 1             // Default quantity set to 1
    }));
}

// Object that handles checkout calculations and order processing
const checkoutProcess = {
    key: "",                // LocalStorage key for retrieving cart data
    outputSelector: "",     // Selector for where to display order summary
    list: [],               // Holds the list of items in the cart
    itemTotal: 0,           // Total cost of items before tax and shipping
    shipping: 0,            // Shipping cost
    tax: 0,                 // Tax amount
    orderTotal: 0,          // Final order total including tax and shipping

    // Initializes the checkout process by loading cart data and displaying item summary
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key) || [];     // Retrieve cart items from LocalStorage
        this.calculateItemSummary();                // Calculate and display item total
        // this.calculateOrdertotal();              // Calculate and display shipping, tax, and total immediately
    },

    // Calculates the total cost of items in the cart and updates the summary section
    calculateItemSummary: function () {
        // Select elements inside the checkout summary
        const summaryElement = document.querySelector(this.outputSelector + " #cartTotal");
        const itemNumElement = document.querySelector(this.outputSelector + " #num-items");
      
        // Ensure elements exist before updating
        if (!summaryElement || !itemNumElement) {
          return;
        }
      
        // Retrieve cart data from LocalStorage
        this.list = getLocalStorage(this.key) || [];
      
        // Update number of items in the cart
        itemNumElement.innerText = this.list.length;
      
        // Ensure cart is not empty before calculating subtotal
        if (this.list.length === 0) {
          this.itemTotal = 0;
        } else {
          const amounts = this.list.map((item) => item.FinalPrice);
          this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
        }
      
        // Display the subtotal in the order summary
        summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
      },

    // Calculate tax, shipping, and final order total
    calculateOrdertotal: function () {
        // Prevents unnecessary calculations on an empty cart
        if (this.list.length === 0) return;

        // Shipping cost: $10 for the first item, $2 for each additional item
        this.shipping = 10 + (this.list.length - 1) * 2;

        // Tax: 6% of the item total
        this.tax = (this.itemTotal * 0.06).toFixed(2);

        // Order Total = item total + tax + shipping
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);

        // Display updated totals
        this.displayOrderTotals();
    },

    // Update the Checkout Summary section with the calculated totals 
    displayOrderTotals: function () {
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");

        // Update UI elements with calculated values
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    },

    // Handles Form submission, prepares order data, and sends it to the server
    checkout: async function (form) {
        const checkoutError = document.getElementById("checkout-error");
        try {
            const json = formDataToJSON(form);

            // Reset error messages
            checkoutError.textContent = "";
            // expirationError.textContent = "";
            checkoutError.style.display = "none";
            // expirationError.style.display = "none";

            let hasError = false; // Track if any errors occur
      
            // Get the error message container at the top
            checkoutError.textContent = ""; // Clear previous errors
        
            // Card Number Validation
            if (json.cardNumber !== "1234123412341234") {
                checkoutError.textContent = "Invalid card number. Please enter 1234123412341234.";
                checkoutError.style.display = "block";
                hasError = true;
            }

            // Expiration Date Validation - must be in mm/yyyy format
            if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(json.expiration)) {
                checkoutError.textContent = "Invalid expiration date.";
                return;
            }

            // Extract the month and year from the expiration date
            const [expMonth, expYear] = json.expiration.split("/").map(Number);

            // Get the current date (current month and year)
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // months are 0-based in JavaScript
            const currentYear = currentDate.getFullYear();

            // Check if the expiration date is less than the current month/year
            if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                checkoutError.textContent = "Expiration date is in the past. Please select a valid expiry date.";
                checkoutError.style.display = "block";
                return;
            }
        
            if (!this.list.length) {
                checkoutError.textContent = "Your cart is empty. Add items before proceeding.";
                checkoutError.style.display = "block";
                return;
            }

            if (hasError) return; // Stop processing if errors exist
        
            json.orderDate = new Date();
            json.orderTotal = this.orderTotal;
            json.tax = this.tax;
            json.shipping = this.shipping;
            json.items = packageItems(this.list);
        
            const response = await checkout(json);
            console.log("Server Response:", response); // Debugging: Log server response
            localStorage.removeItem("so-cart");
            form.reset();
            this.calculateItemSummary();
        
            setTimeout(() => {
                window.location.href = "success.html";
            }, 100);
        } catch (error) {
            // Remove any previous alert messages
            removeAllAlerts();
        
            // Display error message
            if (typeof error.message === "string") {
                alertMessage(error.message);
            } else if (Array.isArray(error.message)) {
                error.message.forEach(msg => alertMessage(msg)); // Handle array errors
            } else {
                alertMessage("An unexpected error occurred.");
            }
        
            console.error(error);
        }
      }

    
    
};

export default checkoutProcess;