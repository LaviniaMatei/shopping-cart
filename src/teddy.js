const selectedTeddy = JSON.parse(localStorage.getItem('selectedTeddy'));


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
        <li><button type="button" class="add-btn">Add to Cart</button></li>
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
        if (isNaN(input.value) || input.value<= 1){
            var result =input.value =0;
            
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

function addTeddyToTheCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.push(selectedTeddy);

    localStorage.setItem('cart', JSON.stringify(cart));

    
}