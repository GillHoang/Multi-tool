const {
    joinVoiceChannel
} = require("@discordjs/voice");
const {
    Client
} = require('discord.js-selfbot-v13');
const client = new Client();
const {
    channelID
    , guildID
} = require("./config.json")

client.on('ready', async () => {
    console.log(`${client.user.username} is online`);
    joinVoiceChannel({
        channelId: channelID, 
        guildId: guildID, 
        adapterCreator: client.guilds.cache.get(guildID).voiceAdapterCreator
    })
})


const token = process.env["token"]
client.login(token);
