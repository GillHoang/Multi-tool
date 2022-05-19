const {
    languageTool
} = require("../config/mainConfig.json")
const { logger } = require("./logger")
function language(cate, text) {

    if (languageTool !== "vi" && languageTool !== "en") {
        return logger.error("Wrong Language, please check agian LanguageTool in mainConfig.json, make sure it is vi or en")
    } else {
        const language = require(`../language/` + languageTool + ".js")
        if (!language[cate]) {
            const language1 = require(`../language/en.js`)
            const textAfter = language1[cate][text]
            return textAfter
        }
        const textAfter = language[cate][text]
        return textAfter
    }
}


module.exports = language