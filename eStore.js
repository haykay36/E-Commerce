class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        this.items.push({ product, quantity });
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
}
// Sample Products
const product1 = new Product(1, 'Hyundai', 10500);
const product2 = new Product(2, 'Lexus', 7300);
const product3 = new Product(3, 'Corolla', 3500);

// Initialize Shopping Cart
const cart = new ShoppingCart();

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

function showMenu() {
    console.log('1. Add Product to Cart');
    console.log('2. View Cart');
    console.log('3. Checkout');
    console.log('4. Exit');
}

function promptUser() {
    readline.question('Enter your choice (1-4): ', handleChoice);
}

function handleChoice(choice) {
    switch (choice) {
        case '1':
            showProducts();
            break;
        case '2':
            viewCart();
            break;
        case '3':
            checkout();
            break;
        case '4':
            readline.close();
            break;
        default:
            console.log('Invalid choice. Please try again.');
            promptUser();
    }
}

function showProducts() {
    console.log('\nAvailable Products:');
    console.log(`1. ${product1.name} - #${product1.price}`);
    console.log(`2. ${product2.name} - #${product2.price}`);
    console.log(`3. ${product3.name} - #${product3.price}`);
   readline.question('Enter product number: ', (productChoice) => {
    addToCart(productChoice);
    });
}

function addToCart(productChoice) {
    let selectedProduct;
    let quantity;
    switch (productChoice) {
        case '1':
            selectedProduct = product1;
            break;
        case '2':
            selectedProduct = product2;
            break;
        case '3':
            selectedProduct = product3;
            break;
        default:
            console.log('Invalid product choice. Please try again.');
            showProducts();
            return;
    }
    readline.question('Enter quantity: ', (quantityInput) => {
        quantity = parseInt(quantityInput, 10);
        if (isNaN(quantity) || quantity <= 0) {
            console.log('Invalid quantity. Please enter a positive number.');
            addToCart(productChoice);
        } else {
            cart.addItem(selectedProduct, quantity);
            console.log(`Added ${quantity}x ${selectedProduct.name} to the cart.`);
            promptUser();
        }
    });
} 


function viewCart() {
    console.log('\nYour Shopping Cart:');
    cart.items.forEach((item) => {
        console.log(`${item.quantity}x ${item.product.name} - $${item.product.price}`);
    });
    console.log(`Total: ${cart.calculateTotal()}`);
    promptUser();
}

function checkout() {
    console.log(`Total amount to pay: $${cart.calculateTotal()}`);
    console.log('Thank you for shopping with us!');
    readline.close();
}

// Start the application
console.log("Welcome to Hay-squared store, We deal in all kinds of Automobiles.");
showMenu();
promptUser()