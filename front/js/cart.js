const emptyStorage = (localStorage.length == 0);

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

        fetch(`http://localhost:3000/api/products/${productId}`)
            .then((response) => response.json())
            .then((product) => cartProductDetails(product, productColor, productQuantity));
    }

    function cartProductDetails(product, color, quantity) {
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
            const productId = $event.target.closest('article').dataset.id;
            const productColor = $event.target.closest('article').dataset.color;
            const productExists = order.find(({ id, color }) => id === productId && color === productColor);

            // find the product specific to the triggered event and update its quantity
            if (productExists) {
                oldQuantity = productExists.quantity;
                productExists.quantity = this.value;
                localStorage.setItem('order', JSON.stringify(order));
                productTotals(product, productExists.quantity, oldQuantity);
            }
        });

        // deleting products
        cartItem.querySelector('.deleteItem').addEventListener('click', function deleteItem($event) {
            const productId = $event.target.closest('article').dataset.id;
            const productColor = $event.target.closest('article').dataset.color;
            const productExists = order.find(({ id, color }) => id === productId && color === productColor);

            // find the product specific to the triggered event
            if (productExists) {
                var orderItems = JSON.parse(localStorage.getItem('order'));

                for (let i = 0; i < orderItems.length; i++) {

                    if (orderItems[i].id == productExists.id && orderItems[i].color == productExists.color) {
                        orderItems.splice(i, 1);
                        console.log(orderItems);
                        localStorage.setItem('order', JSON.stringify(orderItems));
                        location.reload();
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

// total function for quantity modification
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

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const emailInput = document.getElementById('email');
const submitButton = document.getElementById('order');


emailInput.addEventListener('input', ($event) => {

})



submitButton.addEventListener('click', ($event) => {
    $event.preventDefault();
})