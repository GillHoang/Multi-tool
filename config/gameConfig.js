const config = {
    aniGame: {
        ONorOFF: true,
        servers: ["963755112508043314"], //Server IDs enclosed in "" and seperated by 
        webhook: process.env['WH_URL'], //ID for webhook logger
        autoBattle: true,
        serverPrefix: "."
    },
    fisher: {
        ONorOFF: false,
        randomChannel: false,
        IDchannel: "",
        serverPrefix: "%"
    },

}

module.exports = config