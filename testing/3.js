const axios = require('axios');
const SourceBin = require('sourcebin-wrapper');
axios.get('https://api.github.com/repos/hocsinhgioitoan/Mutil-tool/releases/latest').then(resp => {
console.log(resp.data.tag_name)


});