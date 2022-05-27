const config = {
    aniGame: {
        ONorOFF: true,
        servers: ["963755112508043314"], //Server IDs enclosed in "" and seperated by 
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
        ONorOFF: true,
        IDchannel: "970133984287789087",
        mode: {
            trivia: true,
            search: true,
            fish: true, // require "fishing pole" in shop
            beg: true,
            dig: true, // require "shovel" in shop
            hunt: true // require "hunting rifle" in shop
        }
    }

}

module.exports = config