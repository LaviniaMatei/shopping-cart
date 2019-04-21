
let PRODUCTS = [];
var request = new XMLHttpRequest();

request.open('GET', 'http://localhost:3000/api/teddies', true);
request.onload = function() {
  // Begin accessing JSON data here
  var teddies = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    PRODUCTS = teddies;
    let template = document.getElementById('products');
    template.innerHTML = "";
    for(var i in teddies){
      let card = document.createElement('div');
     card.className = 'card-body';
    

      //add the image to the card
      let img = document.createElement('img');
      img.className ='card-img img-responsive'
      img.src = teddies[i].imageUrl;
      card.appendChild(img);
       //add the title to the card
       let title = document.createElement('h2');
       title.className= 'card-title';
       title.textContent = teddies[i].name;
       card.appendChild(title);
       template.appendChild(card);

      //add the button to the card
      let btn = document.createElement('button');
      btn.className = 'btn-lg btn-info align-text-bottom';
      btn.textContent = 'View Item';
      btn.setAttribute('data-id', teddies[i]._id);
      btn.addEventListener('click', openItem);
      card.appendChild(btn);
    }
   
  } else {
    console.log('error');
  }
  
};

request.send();

function openItem(ev) {
  ev.preventDefault();
  let id = ev.target.getAttribute('data-id');
  let teddy = PRODUCTS.find(product=>{
    if(product._id == id){
      return true;
    }else{
      console.log('fail')
    }
  });

  localStorage.setItem('selectedTeddy', JSON.stringify(teddy));
  location.pathname = location.pathname.replace('index.html', 'teddy.html');
}