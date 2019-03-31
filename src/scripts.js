
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
      btn.textContent = 'Add Item';
      btn.setAttribute('data-id', teddies[i]._id);
      btn.addEventListener('click', addItem);
      card.appendChild(btn);
    }
   
  } else {
    console.log('error');
  }
  
};

request.send();



function addItem(ev){
  ev.preventDefault();
  let id = ev.target.getAttribute('data-id');
  let arr = PRODUCTS.filter(product=>{
  if(product._id == id){
  return true;
  }else{
  console.log('fail')
  }
  });
  
  if(arr && arr[0]){
    let obj = {
        id: arr[0]._id,
        image: arr[0].imageUrl,
        name: arr[0].name,
        color: arr[0].colors,
        price: arr[0].price,
        description: arr[0].description
    };
     
	
    img1 = obj.image;

    var output =
    `<ul>
    <li> Name:${obj.name}</li>
    <li> <img class ='single-image' src="${img1}"></li>
    <li> Price:${obj.price}</li>
    <li> Description:${obj.description}</li>
    <li> Colors:${arr[0].colors}</li> 
     </ul>`

    
  }
  document.getElementById('displayTeddy').innerHTML=output;
  
}




  