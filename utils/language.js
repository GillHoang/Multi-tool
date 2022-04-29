const {languageTool} = require("../config/mainConfig.json")
function language(cate, text) {
    const language = require(`../language/`+ languageTool + ".js")
    if (!language[cate]) {
      const language1 = require(`../language/en.js`)
      const textAfter = language1[cate][text] 
      return textAfter
    }
    const textAfter = language[cate][text] 
    return textAfter
}


module.exports = language