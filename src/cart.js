

const submitBtn = document.getElementById('submitBtn');
const responseName = document.getElementById('responseName');

    
submitBtn.addEventListener('click', ($event)=>{
$event.preventDefault();
const post ={
  firstName: document.getElementById('first-name').value,
  lastName:  document.getElementById('last-name').value,
  address: document.getElementById('address').value,
  city: document.getElementById('city').value,
  email: document.getElementById('email').value
};
submitFormData(post);
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
      const requestPromise = makeRequest(post);
      const response = await requestPromise;
      responseName.innerHTML = response.post;

    }catch(errorResponse){
      responseName.innerHTML = errorResponse.error;
    }
  }



  

