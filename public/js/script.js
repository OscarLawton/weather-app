console.log("client side javascript file is loaded!!")

/* fetch('https://puzzle.mead.io/puzzle').then((res) => {
    res.json().then((data) => {
        console.log(data);
    })
}) */

fetch('http://localhost:3000/weather?address=London').then((res) => {
    res.json().then((data) => {
       if(data.err){
           console.log(data.err);
       } else {
           console.log(data.address)
           console.log(data.forecast);
       }
    })
})