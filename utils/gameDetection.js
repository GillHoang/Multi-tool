function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
function game(game) {
    if (isNumeric(game) === false) return game
    else {
        const num = parseInt(game)
        if (game === 0) {
            return "Minecraft";
        } else if (game === 1){
            return "ROBLOX";
        } else if (game === 2){
            return "FiveM";
        } else if (game === 3){ 
            return "League of Legends"
        }
    }
}
module.exports = game
