const axios = require("axios")
function randomText(axios,client) {
  axios.get("https://quote-garden.herokuapp.com/api/v3/quotes/random").then(resp => {
    const mess = resp.data.data
    console.log(mess[0].quoteText)
    
  })
} 
console.log(randomText(axios))