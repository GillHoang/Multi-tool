const config = {
    aniGame: {
        ONorOFF: true,
        servers: [""], //Server IDs enclosed in "" and seperated by 
        webhook: process.env['WH_URL'] //ID for webhook logger
    },
    fisher: {
        ONorOFF: true,
        randomChannel: true,
        IDchannel: "",
        serverPrefix: "%"
    }

}

module.exports = config