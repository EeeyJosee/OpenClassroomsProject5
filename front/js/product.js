// grab URL parameters for variable use on product page
const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);

// declare variables from our web parameters
const id = urlParameters.get('id');


fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((product) => insertProductDetails(product));

// add variable infromation onto the page
function insertProductDetails(product) {
    document.getElementById('title').innerHTML = product.name;
    document.getElementById('price').innerHTML = product.price;
    document.getElementById('description').innerHTML = product.description;

    // add img tag with src and alt text, then append it
    const imgCard = document.createElement('img');
    imgCard.src = product.imageUrl;
    imgCard.alt = product.altTxt;
    document.querySelector('.item__img').appendChild(imgCard);

    select = document.getElementById('colors');

    // for each product color, we'll add it to the dropdown
    for (let i = 0; i < product.colors.length; i++) {
        var option = document.createElement('option');
        option.value = product.colors[i];
        option.innerHTML = product.colors[i];
        select.appendChild(option);
    }
}

// Get access to button element, from here we'll add products to our cart
const addCartButton = document.getElementById("addToCart");
addCartButton.addEventListener("click", addToShoppingCart);

// function to add products
function addToShoppingCart() {
    // see if an order already exists, otherwise create an empty array 
    var cart = JSON.parse(localStorage.getItem('order'));
    if (cart == null) { cart = []; }

    const productId = id;
    const productColor = colors.value;
    
    // check for invalid inputs and already existing id & color cart items
    const invalidInput = (parseInt(quantity.value) <= 0 || productColor === '');
    const productExists = cart.find(({ id, color }) => id === productId && color === productColor);

    if (invalidInput) { alert('Your order was invalid'); }
    else {
        if (productExists) {
            productExists.quantity += parseInt(quantity.value);
        }
        // add new orders to the cart
        else {
            var orderDetails = {
                id: productId,
                color: productColor,
                quantity: parseInt(quantity.value)
            };
            cart.push(orderDetails);
        }
        localStorage.setItem('order', JSON.stringify(cart));
        alert('Order has been placed in the shopping cart');
    }
}