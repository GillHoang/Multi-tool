const {
    joinVoiceChannel
} = require("@discordjs/voice");

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
    selfMute,
    spamMessage,
    channelSpam
} = require("../../../config/mainConfig.json")
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
} = require("../../../config/statusConfig.json")
const language = require("../../../utils/language.js")
const {
    messageOnline
} = require("../../../config/other.json")
var colors = require('colors');
const {
    logger
} = require("../../../utils/logger");
const axios = require("axios")
const config = require("../../../config/gameConfig.js");
module.exports = (client) => {
    logger.info("[LOGIN] ".green + `${language("ready", "login")}` + client.user.tag.red)
    if (notice === true) {
        if (!process.env.WH_URL) {
            return logger.error(language("WH", "invalidWH"))
        } else {
            const WebHookClient = new Discord.WebhookClient({
                url: process.env.WH_URL
            });

            WebHookClient.send({
                content: messageOnline.replace(/<ping>/g, client.ws.ping).replace(/<ms>/g, Math.floor(Date.now() / 1000))
            });
        }
    }
    if (mobileStatus === true) logger.warn(language("ready", "mobileStatus").green)
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
            logger.error(language("settings", "invalidSetting")("(emoji / unicode)").red)
        }
    } else if (CSorRP == "RP") {
        logger.warn(language("ready", "rpWarn"))
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
        logger.error(language("settings", "invalidSetting")("(CS / RP)").red)
    }
    if (autoVoice === true) {
        joinVoice(client, guildID, channelID)
        const voiceName = client.channels.cache.get(channelID).name
        const guildName = client.guilds.cache.get(guildID).name
        logger.new(language("ready", "joinVoice")(voiceName, guildName))
        setInterval(function() {
            joinVoice(client, guildID, channelID)
            logger.update(language("ready", "joinAgain").blue)
        }, 1000 * 60 * 5);
    } else {
        logger.warn(language("ready", "voiceOff").blue)
    };
    if (spamMessage === true) {
        const axios = require("axios")
        randomText(axios, client)
        setInterval(function() {
            randomText(axios, client)
        }, 5000)
    }
    if (config.fisher.ONorOFF === true) {
        const fisherPrefix = config.fisher.serverPrefix
        if (config.fisher.randomChannel === true) {
            const c = randomChannel(client)
            const c_ = client.channels.cache.get(c)
            c_.send(fisherPrefix + "f")
            setInterval(function() {
                const c1 = randomChannel(client)
                const c_1 = client.channels.cache.get(c1)
                c_1.send(fisherPrefix + "f")
            }, 3600)
        } else {
            const channel1 = client.channels.cache.get(config.fisher.IDchannel)
            channel1.send(fisherPrefix + "f")
        }
    }
}

function joinVoice(client, guildID, channelID) {
    joinVoiceChannel({
        channelId: channelID,
        guildId: guildID,
        selfDeaf: selfDeaf,
        selfMute: selfMute,
        adapterCreator: client.guilds.cache.get(guildID).voiceAdapterCreator
    })
    //client.user.setDeaf(true)
    //client.user.setMute(true)
}

function randomText(axios, client) {
    axios.get("https://quote-garden.herokuapp.com/api/v3/quotes/random").then(resp => {
        const mess = resp.data.data[0].quoteText
        const c = randomChannel(client)
        const channel = client.channels.cache.get(c)
        channel.send(mess)
        logger.info(language("ready", "sendMessage")(channel.name))

    })
}

function randomChannel(client) {
    const guildMap = [],
        guildMapAfter = []
    const guild = client.guilds.cache.get(guildID)
    guild.channels.cache
        .map(r =>
            guildMap.push(r)
        )
    const mapt = guildMap.filter(e => e.type == "GUILD_TEXT")
    mapt.map(r =>
        guildMapAfter.push(r.id)
    )
    var id = guildMapAfter[Math.floor(Math.random() * guildMapAfter.length)];
    return id

}