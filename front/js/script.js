
// Need to get information from backend (array)
fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((products) => insertProductCards(products));

// call function which takes in products as an argument and lets us insert product cards on page
function insertProductCards(products) {
    const container = document.getElementById('items');

    // Iterate through said info, and retrieve current element
    for (let i = 0; i < products.length; i++) {
        const card = createCardQuickly(products[i]);
        items.appendChild(card);
    }
}

function createCardQuickly(product) {

// encode our color array into a string to pass as a web parameter
const colorArray = product.colors;
const colorString = encodeURIComponent(JSON.stringify(colorArray));

    // make the card a clickable link
    const card = document.createElement('a');
    card.href = "./product.html?id=" + product._id

    // add our API details to card
    card.innerHTML =
        `<article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
        </article>`

    return card;
}

