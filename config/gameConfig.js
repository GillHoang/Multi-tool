const config = {
    aniGame: {
        ONorOFF: false,
        servers: [""], //Server IDs enclosed in "" and seperated by 
        webhook: process.env['WH_URL'], //ID for webhook logger
        autoBattle: false
    },
    fisher: {
        ONorOFF: false,
        randomChannel: false,
        IDchannel: "",
        serverPrefix: ""
    },
    catbot: {
        ONorOFF: false,
        IDchannel: "",
    }

}

module.exports = config