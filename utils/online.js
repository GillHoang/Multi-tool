function online() {
    const express = require('express');
    const app = express();
    app.get('/', (req, res) => {
        res.send('Your selfbot is online!')
    });
    app.listen(3000, () => {
        console.log('Web is used to host 24/7 online ');
    });
}  
module.exports = online