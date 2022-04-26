const axios = require('axios');
const SourceBin = require('sourcebin-wrapper');
axios.get('https://raw.githubusercontent.com/hocsinhgioitoan/Mutil-tool/main/version.json').then(resp => {
console.log(resp.data)


});