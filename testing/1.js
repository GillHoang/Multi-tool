const axios = require('axios');
const SourceBin = require('sourcebin-wrapper');
axios.get('https://canary.discord.com/api/webhooks/967671266989441024/abc').then(resp => {

    SourceBin.create([
    new SourceBin.BinFile({
        name: 'index.js',
        content: `{$resp}`,
        languageId: 'json'
    })
], {
    title: 'Some test',
    description: 'This is awesome'
})
    //.then(console.log)
    .catch(console.error);


});