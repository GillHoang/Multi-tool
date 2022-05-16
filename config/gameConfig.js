const config = {
    aniGame: {
        ONorOFF: true,
        servers: ["963755112508043314"], //Server IDs enclosed in "" and seperated by 
        webhook: process.env['WH_URL'], //ID for webhook logger
        autoBattle: true
    },
    fisher: {
        ONorOFF: false,
        randomChannel: false,
        IDchannel: "970134004235898960",
        serverPrefix: "%"
    },
    catbot: {
        ONorOFF: false,
        IDchannel: "970133994446389309",
    }

}

module.exports = config