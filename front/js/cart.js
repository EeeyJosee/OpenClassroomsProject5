const emptyStorage = (localStorage.length == 0);
const api = 'http://localhost:3000/api/products'

if (!emptyStorage) {

    // retrieve object from local storage
    order = JSON.parse(localStorage.getItem('order', JSON.stringify(order)));
    const shoppingCart = document.getElementById('cart__items');

    for (let i = 0; i < order.length; i++) {
        const productId = order[i].id;
        const productColor = order[i].color;
        const productQuantity = order[i].quantity;

        var totalArticles = 0;
        var cartTotal = 0;

        fetch(api + `/${productId}`)
            .then((response) => response.json())
            .then((product) => insertCartItem(product, productColor, productQuantity));
    }

    /**
     * Inserts cart items into page for given info.
     * 
     * @param {object} product - cart item product details
     * @param {string} color - cart item product color
     * @param {number} quantity - cart item product quantity
     */
    function insertCartItem(product, color, quantity) {
        // create the shopping cart a product at a time
        const cartItem = document.createElement('article');
        cartItem.classList.add('cart__item');
        cartItem.dataset.id = product._id;
        cartItem.dataset.color = color;

        cartItem.innerHTML = `
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${color}</p>
                    <p>€${product.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Quantity : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Delete</p>
                    </div>
                </div>
            </div>`;
        shoppingCart.appendChild(cartItem);

        // updating product quantities
        cartItem.querySelector('.itemQuantity').addEventListener('change', function changeQuantity($event) {
            const cartItemElement = $event.target.closest('article');
            const productId = cartItemElement.dataset.id;
            const productColor = cartItemElement.dataset.color;
            const productExists = order.find(({ id, color }) => id === productId && color === productColor);

            // before changing quantity, make sure our inputs range from 1 to 100
            const invalidInput = (this.value <= 0 || this.value > 100);
            if (invalidInput) {
                alert('Quantity is invalid');
                this.value = quantity;
            }

            else {
                // find the product specific to the triggered event and update its quantity
                if (productExists) {
                    oldQuantity = productExists.quantity;
                    productExists.quantity = this.value;
                    localStorage.setItem('order', JSON.stringify(order));
                    productTotals(product, productExists.quantity, oldQuantity);
                }
            }
        });

        // deleting products
        cartItem.querySelector('.deleteItem').addEventListener('click', function deleteItem($event) {
            const cartItemElement = $event.target.closest('article');
            const productId = cartItemElement.dataset.id;
            const productColor = cartItemElement.dataset.color;
            const productExists = order.find(({ id, color }) => id === productId && color === productColor);

            // find the product specific to the triggered event
            if (productExists) {
                var orderItems = JSON.parse(localStorage.getItem('order'));

                for (let i = 0; i < orderItems.length; i++) {
                    if (orderItems[i].id == productExists.id && orderItems[i].color == productExists.color) {
                        // make changes to totals before removing the item
                        productTotals(product, 0, orderItems[i].quantity);
                        orderItems.splice(i, 1);
                        localStorage.setItem('order', JSON.stringify(orderItems));
                        cartItemElement.remove();
                    }
                }
            }
        });

        // add the totals of product quantity and price
        totalArticles += parseInt(quantity);
        document.getElementById('totalQuantity').innerText = totalArticles;

        cartTotal += product.price * parseInt(quantity)
        document.getElementById('totalPrice').innerText = cartTotal;
    }
}

/**
 * Calculates total quantities and total price.
 * 
 * @param {object} product - cart item product details
 * @param {number} newQuantity - cart item product new quantity
 * @param {number} oldQuantity - cart item product old quantity
 */
function productTotals(product, newQuantity, oldQuantity) {
    // add up the total product
    if (newQuantity < oldQuantity) { totalArticles += parseInt(newQuantity - oldQuantity); }
    if (newQuantity > oldQuantity) { totalArticles += parseInt(newQuantity - oldQuantity); }
    document.getElementById('totalQuantity').innerText = totalArticles;

    // add up the total price
    if (newQuantity < oldQuantity) { cartTotal += product.price * parseInt(newQuantity - oldQuantity); }
    if (newQuantity > oldQuantity) { cartTotal += product.price * parseInt(newQuantity - oldQuantity); }
    document.getElementById('totalPrice').innerText = cartTotal;
}

// field input elements for contact details
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const emailInput = document.getElementById('email');
const orderButton = document.getElementById('order');

//TODO add event listeners [change event] to input fields for error messages

firstNameInput.value = 'Jose';
lastNameInput.value = 'Villalobos';
addressInput.value = '3030 St';
cityInput.value = 'City';
emailInput.value = 'jose@gmail.com';

orderButton.addEventListener('click', ($event) => {
    $event.preventDefault();

    //TODO validate contact info

    // create an array of product IDs
    const productIdarray = [];
    for (let i = 0; i < order.length; i++) {
        productIdarray[i] = order[i].id;
    }

    const post = {
        "contact": {
            "firstName": firstNameInput.value,
            "lastName": lastNameInput.value,
            "address": addressInput.value,
            "city": cityInput.value,
            "email": emailInput.value
        },
        "products": productIdarray
    };
    submitFormData(post);
    // localStorage.clear();
})

/**
 * Receives API response as an order ID.
 * 
 * @param {object} post - contact details from user input
 */
async function submitFormData(post) {
    try {
        const requestPromise = makeRequest(post)
        const response = await requestPromise;
        orderId = response.orderId;
        console.log(orderId);
        window.location.href = "./confirmation.html?id=" + orderId;
    }
    catch (errorResponse) {
        console.log(errorResponse.error);
    }
}

/**
 * Sends a POST request to /order API.
 * 
 * @param {object} data - contact details from user input
 * @returns 
 */
function makeRequest(data) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('POST', api + '/order');
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 201) {
                    resolve(JSON.parse(request.response));
                } else {
                    reject(JSON.parse(request.response));
                }
            }
        };
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data));
    });
}