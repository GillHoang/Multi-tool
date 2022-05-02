const text = `__Super Rare__ **Mio Takamiya** has been added to **hacked hehehe's** collection!`
const {
    Client,
    WebhookClient,
    User
} = require("discord.js-selfbot-v13");
const mySecret = process.env['WH_URL']
const hook1 = new WebhookClient({
    url: mySecret
});
const rarity = text.split("__", 2).toString()
const r = rarity.slice(1)
const name = text.split("**", 2)
const n = name.slice(1).toString()
if (r == "Rare" || r == "Ultra Rare" || r == "Super Rare") {
    hook1.send(r + " | "+ n)
} else {
    console.log("hello")
}
