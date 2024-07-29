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

        // add the total number of product per iteration
        totalArticles += parseInt(quantity);
        document.getElementById('totalQuantity').innerText = totalArticles;
        // add up the total price per iteration
        cartTotal += product.price * parseInt(quantity);
        document.getElementById('totalPrice').innerText = cartTotal;





        // grab the classname for delete button as it's created
        const allDeleteButtons = document.getElementsByClassName('deleteItem');

        if (allDeleteButtons.length == order.length) {
            
            //TODO figure out how to delete an entry in a value
            for (const deleteButton of allDeleteButtons) {
                
                deleteButton.addEventListener("click", function onClick() {
                    console.log("delete entry");
                    localStorage.removeItem('order');
                });
            }
        }





        // grab the classname for quantity modifier
        const allQuantityButtons = document.getElementsByClassName('itemQuantity');

        if (allQuantityButtons.length == order.length) {
            //TODO figure out how to update a quantity value
            for (const quantityButton of allQuantityButtons) {

                quantityButton.addEventListener("change", function onClick() {

                    const productExists = order.find(({ id, color }) => id === product._id && color === color);

                    console.log(quantityButton);
                    console.log(product._id, color);

                    if (productExists) { productExists.quantity = quantityButton.value}
                    localStorage.setItem('order', JSON.stringify(order));


                });
            }

        }
    }
}


