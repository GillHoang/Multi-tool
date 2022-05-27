const config = {
    aniGame: {
        ONorOFF: false,
        servers: [""], //Server IDs enclosed in "" and seperated by 
        webhook: process.env['WH_URL'], //ID for webhook logger
        autoBattle: false,
        serverPrefix: "."
    },
    fisher: {
        ONorOFF: false,
        randomChannel: false,
        IDchannel: "",
        serverPrefix: "%"
    },
    dank: {
        ONorOFF: false,
        IDchannel: "",
        mode: {
            trivia: false,
            search: false,
            fish: false, // require "fishing pole" in shop
            beg: false,
            dig: false, // require "shovel" in shop
            hunt: false // require "hunting rifle" in shop
        }
    }

}

module.exports = config