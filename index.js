const {
    joinVoiceChannel
} = require("@discordjs/voice");
const {
    Client
} = require('discord.js-selfbot-v13');
const Discord = require('discord.js-selfbot-v13');
const {
    channelID,
    notice,
    guildID,
    autoVoice,
    checkUpdatePackage,
    mobileStatus,
    syncStatus,
    selfDeaf,
    selfMute
} = require("./config/mainConfig.json")
const online = require("./utils/online.js")
online()
var colors = require('colors');
const { logger } = require("./utils/logger");
const client = new Client({
    checkUpdate: checkUpdatePackage,
    readyStatus: syncStatus,
    ws: {
        properties: {
            $browser: mobileStatus ? "Discord iOS" : "Discord Client"
        }
    },
})

const RichPresence = require('discord-rpc-contructor');
const {
    CSorRP,
    CS_EmojiOrUnicode,
    CS_NameCustomEmoji,
    CS_IdCustomEmoji,
    animated,
    CS_NameState,
    CS_UnicodeIcon,
    RP_ApplicationId,
    RP_State,
    RP_Name,
    RP_Details,
    RP_size1,
    RP_size2,
    RP_AssetsLargeImage,
    RP_AssetsSmallImage,
    RP_AssetsLargeText,
    RP_AssetsSmallText
} = require("./config/statusConfig.json")


client.on('ready', async () => {

  
    console.log(`
███╗░░░███╗██╗░░░██╗████████╗██╗██╗░░░░░░██████╗  ████████╗░█████╗░░█████╗░██╗░░░░░
████╗░████║██║░░░██║╚══██╔══╝██║██║░░░░░██╔════╝  ╚══██╔══╝██╔══██╗██╔══██╗██║░░░░░
██╔████╔██║██║░░░██║░░░██║░░░██║██║░░░░░╚█████╗░  ░░░██║░░░██║░░██║██║░░██║██║░░░░░
██║╚██╔╝██║██║░░░██║░░░██║░░░██║██║░░░░░░╚═══██╗  ░░░██║░░░██║░░██║██║░░██║██║░░░░░
██║░╚═╝░██║╚██████╔╝░░░██║░░░██║███████╗██████╔╝  ░░░██║░░░╚█████╔╝╚█████╔╝███████╗
╚═╝░░░░░╚═╝░╚═════╝░░░░╚═╝░░░╚═╝╚══════╝╚═════╝░  ░░░╚═╝░░░░╚════╝░░╚════╝░╚══════╝
Made by hocsinhgioitoan Verion 1.3.3
`)
    console.log('[LOGIN]'.green + ' Logged in as ' + client.user.tag.red);
    //logger.info("[LOGIN] ".green + "logged in as "+ client.user.tag.red)
    if (notice === true) {
        if (!process.env.WH_URL) throw new TypeError("Invalid Webhook Link. Please check here https://github.com/hocsinhgioitoan/Mutil-tool#env-required")
        const WebHookClient = new Discord.WebhookClient({
            url: process.env.WH_URL
        });
        
        WebHookClient.send({
            content: 'Hello! :wave:\n' + client.ws.ping + 'ms - <t:' + Math.floor(Date.now() / 1000) + ':R>'
        });
    }
    if (mobileStatus === true) console.log(` If you don't see your account showing mobile status because it's visible to others but not to you.\n It will take a while for it to show the mobile status so please be patient`.green)
    if (CSorRP == "CS") {
        if (CS_EmojiOrUnicode == "emoji") {
            const custom = new RichPresence.CustomStatus()
                .setDiscordEmoji({
                    name: CS_NameCustomEmoji,
                    id: CS_IdCustomEmoji,
                    animated: animated,
                })
                .setState(CS_NameState)
                .toDiscord();
            client.user.setActivity(custom);
        } else if (CS_EmojiOrUnicode == "unicode") {
            const custom = new RichPresence.CustomStatus()
                .setUnicodeEmoji(CS_UnicodeIcon)
                .setState(CS_NameState)
                .toDiscord();
            client.user.setActivity(custom);
        } else {
            console.log("Invalid Settings (emoji / unicode)".red)
        }
    } else if (CSorRP == "RP") {
        const RPC = require('discord-rpc-contructor');
        const r = new RPC.Rpc()
            .setApplicationId(RP_ApplicationId)
            .setType(0)
            .setState(RP_State)
            .setName(RP_Name)
            .setDetails(RP_Details)
            .setParty({
                size: [RP_size1, RP_size2],
                id: RPC.uuid(),
            })
            .setStartTimestamp(Date.now())
            .setAssetsLargeImage(RP_AssetsLargeImage)
            .setAssetsLargeText(RP_AssetsLargeText)
            .setAssetsSmallImage(RP_AssetsSmallImage)
            .setAssetsSmallText(RP_AssetsSmallText)
        client.user.setActivity(r.toDiscord().game);
        // Button not working
    } else {
        console.log("Invalid Settings (CS / RP)".red)
    }
    if (autoVoice === true) {
        joinVoice(client, guildID, channelID)
        const voiceName = client.channels.cache.get(channelID).name
        const guildName = client.guilds.cache.get(guildID).name
        console.log(`Joined voice ` + voiceName + " in " + guildName)
        setInterval(function() {
            joinVoice(client, guildID, channelID)
            console.log("Join again".blue)
        }, 1000 * 60 * 5);
    } else {
        console.log("Turned off mode auto voice".blue)
    }
})



client.login(process.env["token"] || process.env["TOKEN"]); // Don't paste your token here 
function joinVoice(client, guildID, channelID) {
    joinVoiceChannel({
        channelId: channelID,
        guildId: guildID,
        selfDeaf: selfDeaf,
        selfMute: selfMute,
        adapterCreator: client.guilds.cache.get(guildID).voiceAdapterCreator
    })
}