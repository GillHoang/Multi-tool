const { logger } = require("../../../utils/logger")

module.exports = (client, info) => { 
    logger.error("This tool is rate limited")
}
