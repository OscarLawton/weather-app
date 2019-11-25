console.log("client side javascript file is loaded!!")

/* fetch('https://puzzle.mead.io/puzzle').then((res) => {
    res.json().then((data) => {
        console.log(data);
    })
}) */


const weatherForm = document.querySelector('form')
const search = document.querySelector("input")
const messageOne = document.querySelector("#location")
const messageTwo = document.querySelector("#results")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ""
    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if(data.err){
                console.log(data.err);
                messageOne.textContent = data.err
            } else {
                console.log(data);
                console.log(data.forecast);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast
                
            }
        })
    })
    

})