const {logger} = require("./logger.js")
const {linkWeb} = require("../config/mainConfig.json")
const axios = require("axios")
function online() {
    const express = require('express');
    const app = express();
    app.get('/', (req, res) => {
        res.send('Your selfbot is online!')
    });
    app.listen(3000, () => {
        logger.info('Web is used to host 24/7 online ');
    });
    setInterval(function() {
      axios.get(linkWeb).then(res=>{
        logger.heartbeat("Pinged web")
      })
      
    },1000*60*1)
}  
module.exports = online