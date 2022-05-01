const config = {
    aniGame: {
        ONorOFF: true,
        servers: [""], //Server IDs enclosed in "" and seperated by 
        webhook: process.env['WH_URL'] //ID for webhook logger
    },
    fisher: {
        ONorOFF: true,
        randomChannel: false,
        IDchannel: "970134004235898960",
        serverPrefix: "%"
    }

}

module.exports = config