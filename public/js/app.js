
const address = `boston`;

const form = document.querySelector('form');
const input = document.querySelector('input');
const name = document.getElementById('name');
const temperature = document.getElementById('temperature');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let value = input.value;
    name.textContent = 'rendering'
    fetch(`http://localhost:3000/weather?addr=${value}`).then(response=>{
    response.json().then(data=>{
        console.log(data)
        if(data.error){
            name.innerText = data.error;
        }else{
            console.log(data)
            name.innerText = data.name;
            temperature.innerText = data.temperature;
        }
    })
})
})


