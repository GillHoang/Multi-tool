const {
    joinVoiceChannel
} = require("@discordjs/voice");
const {
    Client
} = require('discord.js-selfbot-v13');
const client = new Client();
const {
    channelID,
    guildID,
    autoVoice
} = require("./config/mainConfig.json")
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
Made by hocsinhgioitoan Verion 1.2.0
`)
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
           console.log("Invalid Settings (emoji / unicode)")
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
       console.log("Invalid Settings (CS / RP)")
    }
    if (autoVoice === true){
      joinVoiceChannel({
        channelId: channelID,
        guildId: guildID,
        adapterCreator: client.guilds.cache.get(guildID).voiceAdapterCreator
    })
    const voiceName = client.channels.cache.get(channelID).name
    const guildName = client.guilds.cache.get(guildID).name
    console.log(`Joined voice ` + voiceName + " in " + guildName)
    } else {
      console.log("Turned off mode auto voice")
    }
})


const token = process.env["token"]
client.login(token);