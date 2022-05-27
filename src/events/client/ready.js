const { joinVoiceChannel } = require("@discordjs/voice");
require("dotenv").config();
const Discord = require("discord.js-selfbot-v13");
const {
  notice,
  guildID,
  mobileStatus,
  spam,
  voice,
} = require("../../../config/mainConfig.json");
const RichPresence = require("discord-rpc-contructor");
const {
  SP,
  ST,
  RP,
  CS,
  status,
  GAME,
} = require("../../../config/statusConfig.json");
const language = require("../../../utils/language.js");
const { messageOnline } = require("../../../config/other.json");
var colors = require("colors");
const { logger } = require("../../../utils/logger");
const axios = require("axios");
const config = require("../../../config/gameConfig.js");
const game = require("../../../utils/gameDetection");
module.exports = (client) => {
  logger.info(
    "[LOGIN] ".green + `${language("ready", "login")}` + client.user.tag.red
  );
  if (notice.notice === true) {
    if (!process.env.WH_URL) {
      return logger.error(language("WH", "invalidWH"));
    } else {
      const WebHookClient = new Discord.WebhookClient({
        url: process.env.WH_URL,
      });

      WebHookClient.send({
        content: messageOnline
          .replace(/<ping>/g, client.ws.ping)
          .replace(/<ms>/g, Math.floor(Date.now() / 1000)),
      });
    }
  }
  if (mobileStatus === true)
    logger.warn(language("ready", "mobileStatus").green);
  if (status == "CS") {
    if (CS_EmojiOrUnicode == "emoji") {
      const custom = new RichPresence.CustomStatus()
        .setDiscordEmoji({
          name: CS.CS_NameCustomEmoji,
          id: CS.CS_IdCustomEmoji,
          animated: CS.animated,
        })
        .setState(CS.CS_NameState)
        .toDiscord();
      client.user.setActivity(custom);
    } else if (CS_EmojiOrUnicode == "unicode") {
      const custom = new RichPresence.CustomStatus()
        .setUnicodeEmoji(CS.S_UnicodeIcon)
        .setState(CS.CS_NameState)
        .toDiscord();
      client.user.setActivity(custom);
    } else {
      logger.error(
        language("settings", "invalidSetting")("(emoji / unicode)").red
      );
    }
  } else if (status == "RP") {
    logger.warn(language("ready", "rpWarn"));
    const RPC = require("discord-rpc-contructor");
    const r = new RPC.Rpc()
      .setApplicationId(RP.RP_ApplicationId)
      .setType(0)
      .setState(RP.RP_State)
      .setName(RP.RP_Name)
      .setDetails(RP.RP_Details)
      .setParty({
        size: [RP.RP_size1, RP.RP_size2],
        id: RPC.uuid(),
      })
      .setStartTimestamp(Date.now())
      .setAssetsLargeImage(RP.RP_AssetsLargeImage)
      .setAssetsLargeText(RP.RP_AssetsLargeText)
      .setAssetsSmallImage(RP.RP_AssetsSmallImage)
      .setAssetsSmallText(RP.RP_AssetsSmallText);

    client.user.setActivity(r.toDiscord().game);
  } else if (status == "ST") {
    const stream = new RichPresence.Rpc()
      .setType("STREAMING")
      .setName(ST.ST_name)
      .setUrl(ST.ST_url_stream);
    client.user.setActivity(stream.toDiscord().game);
  } else if (status == "SP") {
    const streamRPC = require("discord-rpc-contructor");
    const presence = streamRPC
      .createSpotifyRpc(client)
      .setAssetsLargeImage("spotify:f2ed07272dec9cfc3b6805e9c59eac3391a59bed")
      .setAssetsSmallImage("spotify:f2ed07272dec9cfc3b6805e9c59eac3391a59bed")
      .setDetails(SP.SP_Details)
      .setState(SP.SP_State);
    client.user.setActivity(presence.toDiscord().game);
    logger.warn("[BETA] More change is coming!".red);
  } else if (status == "GAME") {
    client.user.setPresence({
      activities: [
        {
          type: 0,
          name: game(GAME.GAME_Name),
          timestamps: {
            start: Math.floor(new Date().getTime()),
          },
        },
      ],
    });
  } else {
    logger.error(
      language("settings", "invalidSetting")("(CS / RP / ST / SP)").red
    );
  }
  if (voice.autoVoice === true) {
    const check_1 = client.channels.cache.get(voice.channelID);
    if (!check_1)
      return logger.error(
        "There was an error, please check the channel Id again, maybe the syntax is wrong or the channel Id does not exist (channel voice)"
      );
    const check_2 = client.guilds.cache.get(guildID);
    if (!check_2)
      return logger.error(
        "There was an error, please check the guild Id again, maybe the syntax is wrong or the guild Id does not exist (guild to auto voice))"
      );

    if (check_1.type === "GUILD_VOICE") {
      joinVoice(client, guildID, voice.channelID);
      const voiceName = client.channels.cache.get(voice.channelID).name;
      const guildName = client.guilds.cache.get(guildID).name;
      logger.new(language("ready", "joinVoice")(voiceName, guildName));
      setInterval(function () {
        joinVoice(client, guildID, voice.channelID);
        logger.update(language("ready", "joinAgain").blue);
      }, 1000 * 60 * 5);
    } else {
      logger.error(
        "This channel is text channel, please enter the voice channel to run this mode"
      );
    }
  } else {
    logger.warn(language("ready", "voiceOff").blue);
  }
  if (spam.spamMessage === true) {
    const axios = require("axios");
    randomText(axios, client);
    setInterval(function () {
      randomText(axios, client);
    }, 5000);
  }
  if (config.fisher.ONorOFF === true) {
    const fisherPrefix = config.fisher.serverPrefix;
    if (config.fisher.randomChannel === true) {
      const c = randomChannel(client);
      const c_ = client.channels.cache.get(c);
      if (!c_) return logger.error("Missing channel");
      if (c_.type === "GUILD_VOICE")
        return logger.error(
          "This channel is not the text channel, can't use for farm"
        );
      c_.send(fisherPrefix + "f");
      setInterval(function () {
        const c1 = randomChannel(client);
        const c_1 = client.channels.cache.get(c1);
        c_1.send(fisherPrefix + "f");
      }, 3600);
    } else {
      const channel1 = client.channels.cache.get(config.fisher.IDchannel);
      channel1.send(fisherPrefix + "f");
      setInterval(function () {
        const channel1 = client.channels.cache.get(config.fisher.IDchannel);
        channel1.send(fisherPrefix + "f");
      }, 3500);
    }
  }
  if (config.aniGame.ONorOFF === true) {
    const guilds = config.aniGame.servers;

    for (guild of guilds) {
      const check_4 = client.guilds.cache.get(guild);
      if (!check_4) logger.info(guild + " is not found, please check again");
      // =)))
      else continue;
    }
  }
  if (config.dank.ONorOFF === true) {
    const channel_dank = client.channels.cache.get(config.dank.IDchannel);
    if (config.dank.mode.trivia === true) {
      channel_dank.send("pls trivia");
      setInterval(function () {
        channel_dank.send("pls trivia");
      }, randomIntFromInterval(10 * 1000, 15 * 1000));
    }
    if (config.dank.mode.search === true) {
      channel_dank.send("pls search");
      setInterval(function () {
        channel_dank.send("pls search");
      }, randomIntFromInterval(30 * 1000, 45 * 1000));
    }
    if (config.dank.mode.fish === true) {
      channel_dank.send("pls fish");
      setInterval(function () {
        channel_dank.send("pls fish");
      }, randomIntFromInterval(40 * 1000, 55 * 1000));
    }
    if (config.dank.mode.beg === true) {
      channel_dank.send("pls beg");
      setInterval(function () {
        channel_dank.send("pls beg");
      }, randomIntFromInterval(40 * 1000, 55 * 1000));
    }
    if (config.dank.mode.dig === true) {
      channel_dank.send("pls dig");
      setInterval(function () {
        channel_dank.send("pls dig");
      }, randomIntFromInterval(40 * 1000, 55 * 1000));
    }
    if (config.dank.mode.hunt === true) {
      channel_dank.send("pls hunt");
      setInterval(function () {
        channel_dank.send("pls hunt");
      }, randomIntFromInterval(40 * 1000, 55 * 1000));
    }
  }
};

function joinVoice(client, guildID, channelID) {
  joinVoiceChannel({
    channelId: channelID,
    guildId: guildID,
    selfDeaf: voice.selfDeaf,
    selfMute: voice.selfMute,
    adapterCreator: client.guilds.cache.get(guildID).voiceAdapterCreator,
  });
}

function randomText(axios, client) {
  if (spam.randomChannelSpam === true) {
    if (!spam.channelSpam)
      return logger.error(
        "Empty channel id, please fill channelSpam to run this mode"
      );
    const check_3 = client.channels.cache.get(spam.channelSpam);
    if (!check_3)
      return logger.error(
        "There was an error, please check the channel Id again, maybe the syntax is wrong or the channel Id does not exist (channel spam)"
      );
    if (channel.type === "GUILD_VOICE")
      return logger.error(
        "This channel is not the text channel, can't use for spam"
      );
  }
  axios
    .get("https://quote-garden.herokuapp.com/api/v3/quotes/random")
    .then((resp) => {
      const mess = resp.data.data[0].quoteText;
      if (spam.randomChannelSpam === true) {
        const c = randomChannel(client);
        const channel = client.channels.cache.get(c);
        channel.send(mess);
        logger.info(language("ready", "sendMessage")(channel.name));
      } else {
        const channel = client.channels.cache.get(spam.channelSpam);
        channel.send(mess);
        //logger.info(language("ready", "sendMessage")(channel.name))
      }
    });
}

function randomChannel(client) {
  const guildMap = [],
    guildMapAfter = [];
  const guild = client.guilds.cache.get(guildID);
  guild.channels.cache.map((r) => guildMap.push(r));
  const mapt = guildMap.filter((e) => e.type == "GUILD_TEXT");
  mapt.map((r) => guildMapAfter.push(r.id));
  var id = guildMapAfter[Math.floor(Math.random() * guildMapAfter.length)];
  return id;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
