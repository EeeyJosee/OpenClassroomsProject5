
// Need to get information from backend (array)
fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((products) => insertProductCards(products));

// call function which takes in products as an argument and lets us insert product cards on page
function insertProductCards(products) {
    const container = document.getElementById('items');
    console.log('items');

    // Iterate through said info, and retrieve current element
    for (let i = 0; i < products.length; i++) {
        const card = createCardQuickly(products[i]);
        items.appendChild(card);
    }
}

function createCard(product) {
    // create new card DOM element thats inserted into homepage (JS to create html)
    const card = document.createElement('section');

    const name = document.createElement('h2');
    const price = document.createElement('p');
    const description = document.createElement('p');
    const image = document.createElement('img')

    card.classList.add('card');

    // insert current element info into new card
    name.innerHTML = product.name;
    price.innerText = product.price;
    description.innerHTML = product.description;
    image.setAttribute('src', Obj.imageUrl)

    // attach the card to the page last step
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(description);
    card.appendChild(image);

    return card;
}

function createCardQuickly(product) {
    const card = document.createElement('a');
    // TODO add href to card element
    card.innerHTML =
        `<article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
        </article>`

        return card;
}




