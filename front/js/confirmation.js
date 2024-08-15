// grab URL parameters for variable use on product page
const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);

// insert order id onto page
const id = urlParameters.get('id');
document.getElementById('orderId').innerHTML = id;