const selectedTeddy = JSON.parse(localStorage.getItem('selectedTeddy'));
let cartArray = JSON.parse(localStorage.getItem('cartArray'));

window.onload = function(){
    if(selectedTeddy){
        let obj = {
            id: selectedTeddy._id,
            image: selectedTeddy.imageUrl,
            name: selectedTeddy.name,
            colors: selectedTeddy.colors,
            price: selectedTeddy.price,
            description: selectedTeddy.description
        };
        
        
        img1 = obj.image;

        
        var output =
        `<ul>
        <li> Name:${obj.name}</li>
        <li> <img class ='single-image' src="${img1}"></li>
        <li> Price:${obj.price}</li>
        <li> Description:${obj.description}</li>
        <li class="colors-edit"> Colors: </li> 
        <li class="numbers-edit"> Quantity: </li>
        </ul>`

        
        document.getElementById('displayTeddy').innerHTML=output;
        
        // select numbers

        var numbersEdit =document.querySelector('.numbers-edit');
        var input = document.createElement('input');
        input.className= 'quantity-input'
        var inputNumber =input.type= 'number';
        var inputValue = input.value = '1';
        numbersEdit.appendChild(input);
        input.addEventListener('change',quantityChanged);
        

        function quantityChanged(event){
        var input= event.target;
        if (isNaN(input.value) || input.value<= 0){
            var result =input.value =1;
            
        }
        }

        //select colors

        var colorsEdit = document.querySelector('.colors-edit');
        var colorsEditSelect = document.createElement('select');
        colorsEdit.appendChild(colorsEditSelect);
        
        //colorsEditSelect.addEventListener('change', function() {
        
        //});
        
        for(let color of obj.colors) {
        let colorOption = document.createElement('option');
        colorOption.value = color;
        colorOption.innerText = color;
        colorsEditSelect.appendChild(colorOption);      
        }
    }else {
        //todo just do some error handling when the teddy is not set int the localstorage
    }
}
function addToCart() {
 if(!cartArray) {
     cartArray = [];
 }

 var correspondingTeddy = cartArray.find(function(teddy) {
     return teddy.id === selectedTeddy.id && teddy.color === selectedTeddy.color;
 });

 if(correspondingTeddy) {
     correspondingTeddy.quantity += selectedQuantity;
 } else {
     cartArray.push({id: selectedTeddy.id, color: selectedColor, quantity: selectedQuantity});
 }

 localStorage.setItem(JSON.stringify(cartArray));
}