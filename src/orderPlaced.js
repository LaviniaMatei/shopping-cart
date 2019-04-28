window.onload = function(){

    const confirmedData = JSON.parse(localStorage.getItem('confirmedOrderData'));
    
    const finalRes = document.getElementById('finalRes');

    finalRes.innerHTML = `<p class ='finalMsg'>You have completed the order, total sum is ${confirmedData.totalPrice}<br> 
                          and the id is ${confirmedData.orderId}<br> Thank you for shopping with us!</p>`;
}