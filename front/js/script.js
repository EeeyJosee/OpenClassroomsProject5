
// Need to get information from backend (array)
fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((products) => insertProductCards(products));

/**
 *  Inserts product cards on page.
 * 
 * @param {array} products - all available products
 */
function insertProductCards(products) {
    const container = document.getElementById('items');

    // Iterate through said info, and retrieve current element
    for (let i = 0; i < products.length; i++) {
        const card = createCardQuickly(products[i]);
        items.appendChild(card);
    }
}

/**
 * Creates individual product cards.
 * 
 * @param {object} product - product details and identifiers
 * @returns - completed card
 */
function createCardQuickly(product) {

    // encode our color array into a string to pass as a web parameter
    const colorArray = product.colors;
    encodeURIComponent(JSON.stringify(colorArray));

    // make the card a clickable link
    const card = document.createElement('a');
    card.href = "./product.html?id=" + product._id;

    // add our API details to card
    card.innerHTML =
        `<article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
        </article>`

    return card;
}

