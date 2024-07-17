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

    for (let i = 0; i < product.colors.length; i++) {
        var option = document.createElement('option');
        option.value = product.colors[i];
        option.innerHTML = product.colors[i];
        select.appendChild(option);
    }
}

