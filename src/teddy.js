const selectedTeddy = JSON.parse(localStorage.getItem('selectedTeddy'));

let quantityInput;
let colorsEditSelect;

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
        
        <li> <img class ='single-image' src="${img1}"></li>
        <li> <span class = 'teddy-details'>Name</span>: ${obj.name}</li>
        <li> <span class = 'teddy-details'>Price</span>: ${obj.price}</li>
        <li> <span class = 'teddy-details'>Description</span>: ${obj.description}</li>
        <li class="colors-edit"> <span class = 'teddy-details'>Colors: </span</li> 
        <li class="numbers-edit"><span class = 'teddy-details'> Quantity: </span></li>
        <li><button type="button" class="add-btn" onclick="addTeddyToTheCart()">Add to Cart</button></li>
        </ul>`

        
        document.getElementById('displayTeddy').innerHTML=output;
        
        // select numbers

        var numbersEdit =document.querySelector('.numbers-edit');
        quantityInput = document.createElement('input');
        quantityInput.className= 'quantity-input'
        var inputNumber =quantityInput.type= 'number';
        var inputValue = quantityInput.value = '1';
        numbersEdit.appendChild(quantityInput);
        quantityInput.addEventListener('change',quantityChanged);
        

        function quantityChanged(event){
        if (isNaN(quantityInput.value) || quantityInput.value<= 1){
            var result =quantityInput.value =0;
        }
        }

        //select colors

        var colorsEdit = document.querySelector('.colors-edit');
        colorsEditSelect = document.createElement('select');
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

function addTeddyToTheCart() {
    if(quantityInput.value === 0) {
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    selectedTeddy.color = colorsEditSelect.value;
    selectedTeddy.quantity = +quantityInput.value;

    const sameColorTeddy = cart.find(teddy => {
        return teddy.color === selectedTeddy.color && teddy._id === selectedTeddy._id
    });

    if(sameColorTeddy) {
        sameColorTeddy.quantity += selectedTeddy.quantity;
    } else {
        cart.push(selectedTeddy);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}