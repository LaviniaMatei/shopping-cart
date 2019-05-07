
const productsContainer = document.getElementById('products');
const contactForm = document.querySelector('#contact-form');
const responseName = document.getElementById('responseName');

let cart = JSON.parse(localStorage.getItem('cart'));
    

window.onload = showTeddies;
let totalPrice = 0;
function showTeddies() {
  productsContainer.innerHTML = '';
  totalPrice = 0;

  for(let cartItem of cart) {
    const cartItemEl = document.createElement('div');

    cartItemEl.innerHTML = `
      <img class="img-fluid rounded  max-width: 100% height: auto pt-3" src="${cartItem.imageUrl}" width = "400px"/>
      <p> Name: ${cartItem.name}</p>
      <p>Color: ${cartItem.color}</p>
      <p>Quantity: ${cartItem.quantity}</p>
      <p>Price: ${cartItem.price * cartItem.quantity}</p>
      
      <button class="float-right mr-5 mb-5 mt-3 submitBtn" onclick="deleteTheTeddy('${cartItem._id}','${cartItem.color}')">Remove item </button> 
      
    `;

    totalPrice += cartItem.price * cartItem.quantity;

    productsContainer.appendChild(cartItemEl);
  }

  productsContainer.innerHTML += '<div><p>Total Price of Your Order is: ' + totalPrice + '</p></div>';
}

function deleteTheTeddy(id, color) {
  cart = cart.filter(cartItem => {
    return cartItem._id !== id || cartItem.color !== color;  
    
  });

  showTeddies();
  localStorage.setItem('cart', JSON.stringify(cart));
}

contactForm.addEventListener('submit', ($event)=>{
$event.preventDefault();

const post ={
  contact: {
    firstName: document.getElementById('first-name').value,
    lastName:  document.getElementById('last-name').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value
  },
  products: cart.map(teddy => teddy._id)
};
submitFormData(post);
return false;
});

function makeRequest(data) {
  return new Promise ((resolve, reject) =>{
let request = new XMLHttpRequest();
request.open( 'POST', 'http://localhost:3000/api/teddies/order', true);
request.onreadystatechange = () =>{
if (request.readyState === 4){
  if (request.status === 201){
resolve(JSON.parse(request.response));
  }else{
reject(JSON.parse(request.response));
  }
}
}
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify(data));
  });
}

  async function submitFormData(post){
    try{
      const requestPromise = makeRequest(post).then((response) => {
        localStorage.setItem('cart', JSON.stringify([]));

        localStorage.setItem('confirmedOrderData', JSON.stringify({
          totalPrice: totalPrice,
          orderId: response.orderId
        }));

        location.pathname =  location.pathname.replace('cart.html', 'orderPlaced.html');
      });

    }catch(errorResponse){
      responseName.innerHTML = errorResponse.error;
    }
  }



  

  