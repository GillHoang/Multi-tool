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
    selfMute
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

const {
    messageOnline
} = require("../../../config/other.json")
var colors = require('colors');
const {
    logger
} = require("../../../utils/logger");

module.exports = (client) => {
    logger.info("[LOGIN] ".green + "logged in as " + client.user.tag.red)
    if (notice === true) {
        if (!process.env.WH_URL) {
            return logger.error("Invalid Webhook Link. Please check here https://github.com/hocsinhgioitoan/Mutil-tool#env-required")
        } else {
            const WebHookClient = new Discord.WebhookClient({
                url: process.env.WH_URL
            });

            WebHookClient.send({
                content: messageOnline.replace(/<ping>/g, client.ws.ping).replace(/<ms>/g, Math.floor(Date.now() / 1000))
            });
        }
    }
    if (mobileStatus === true) logger.warn(` If you don't see your account showing mobile status because it's visible to others but not to you.\n It will take a while for it to show the mobile status so please be patient`.green)
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
            logger.error("Invalid Settings (emoji / unicode)".red)
        }
    } else if (CSorRP == "RP") {
        logger.warn("If you don't see large and small images in rich presence, please wait for a while for the image to load!")
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
        logger.error("Invalid Settings (CS / RP)".red)
    }
    if (autoVoice === true) {
        joinVoice(client, guildID, channelID)
        const voiceName = client.channels.cache.get(channelID).name
        const guildName = client.guilds.cache.get(guildID).name
        logger.new(`Joined voice ` + voiceName + " in " + guildName)
        setInterval(function() {
            joinVoice(client, guildID, channelID)
            logger.update("Join again".blue)
        }, 1000 * 60 * 5);
    } else {
        logger.warn("Turned off mode auto voice".blue)
    }
};

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