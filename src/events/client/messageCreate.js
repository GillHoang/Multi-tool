const config = require("../../../config/gameConfig");
const { WebhookClient } = require("discord.js-selfbot-v13");
const {
  giveawayBot,
  waittime,
  uid,
  ONorOFF,
} = require("../../../config/giveawayConfig.json");
const d = new Date();
const x = d / 1000;
const { logger } = require("../../../utils/logger");
const anigame = ["571027211407196161"]; //Anigame ID
const fisher = ["574652751745777665"];
const dank = ["270904126974590976"];
const { fullUserName } = require("../../../config/mainConfig.json");
const hook = new WebhookClient({
  url: config.aniGame.webhook,
});
const language = require("../../../utils/language.js");
module.exports = (client, message) => {
  if (!message.guild) return
  if (config.aniGame.ONorOFF === true) {
    if (config.aniGame.servers.length === 0)
      return logger.error("Please enter guild to snipe card");
    if (anigame.includes(message.author.id)) {
      if (!message.guild) return;

      if (config.aniGame.servers.includes(message.guild.id)) {
        message.embeds.forEach(async (e) => {
          if (!e.title) return;
          if (!e.footer) return;
          if (
            e.title.includes("What's this?") &&
            e.footer.text.includes(
              `Click on the claim button first to claim this card!`
            )
          ) {
            const label = "Claim!";
            const row = message.components[0];
            const button = row.components.find(
              (button_) => button_.label == label
            );
            if (!button) return;
            button.click(message);
            hook.send(
              `<t:${Math.floor(x)}:R> | Claimed card in [${
                message.channel.name
              }](${message.channel.url})`
            );
            logger.info(
              language("aniGame", "claimedCard")(message.channel.name)
            );
          }
        });
        message.embeds.forEach(async (e) => {
          if (!e.title) return;
          if (!e.description) return;
          if (
            e.title.includes(
              `**Successfully claimed by __${fullUserName}__** <:claimed:896016100976910346>`
            )
          ) {
            const des = e.description;
            const rarity = des.split("__", 2).toString();
            const r = rarity.slice(1);
            const name = des.split("**", 2);
            const n = name.slice(1).toString();
            if (r == "Rare" || r == "Ultra Rare" || r == "Super Rare") {
              hook.send(`You got ` + r + "name is" + n);
            }
          }
        });
        if (config.aniGame.autoBattle === true) {
          const prefix = config.aniGame.serverPrefix;
          clickEnterBattle(client, message);
          message.embeds.forEach(async (e) => {
            if (!e.title) return;
            if (!e.description) return;
            if (e.title.includes(`Challenging Floor`)) return;
            else if (
              e.title.includes("**Victory <a:CHEER:705920932677681253>**") &&
              e.author.name.includes(client.user.username)
            ) {
              message.channel.send(prefix + "fl n");
              sleep("2000");
              message.channel.send(prefix + "bt");
            }
          });
          message.embeds.forEach(async (e) => {
            if (!e.author) return;
            if (!e.title) return;
            if (!e.description) return;
            if (
              e.title.includes("Congratulations!") &&
              e.author.name.includes(client.user.username) &&
              e.description.includes("You have cleared area")
            ) {
              const des = e.description;
              const loc = des.split(" ");
              const aloc = loc[4].toString().replace(/,\s*$/, "");
              const nextloc = parseInt(aloc) + 1;
              message.channel.send(prefix + `loc ` + nextloc);
            }
          });
          message.embeds.forEach(async (e) => {
            if (!e.title) return;
            if (!e.author) return;
            if (
              e.title.includes("Successfully travelled to") &&
              e.author.name.includes(client.user.username)
            ) {
              message.channel.send(prefix + "bt");
            }
          });
          message.embeds.forEach(async (e) => {
            if (!e.title) return;
            if (!e.author) return;
            if (!e.footer) return;
            if (!e.description) return;
            if (
              e.author.name.includes(client.user.username) &&
              e.title.includes("Error ⛔") &&
              e.description.includes(
                "You do not have enough stamina to proceed!"
              ) &&
              e.footer.text.includes(
                "If you require assistance with this command, please type .help battle for more info!"
              )
            ) {
              logger.info("Waiting for stamina!");
              sleep(100 * 60 * 2);
              message.channel.send(prefix + "bt");
            }
          });
          const content = message.content;
          if (content.includes("This command is on cooldown... ")) {
            setTimeout(function () {
              message.channel.send(prefix + "bt");
            }, 2000);
          }
        }
      }
    }
  }
  if (config.fisher.ONorOFF === true) {
    if (fisher.includes(message.author.id)) {
      message.embeds.forEach(async (e) => {
        if (!e.title) return;
        if (!e.footer) return;
        if (e.title.includes("Anti-bot")) {
          hook.send(`Got captcha in ${message.channel.name}`);
          closeServer();
        }
        if (e.title.includes("You caught:")) {
          setInterval(function () {
            const label = "Sell";
            const row = message.components[0];
            if (!row) return;
            const button = row.components.find(
              (button_) => button_.label == label
            );
            if (!button) return;
            button.click(message);
            logger.info("Sell fish");
          }, 1000 * 60);
        }
      });
    }
  }
  if (config.dank.ONorOFF === true) {
    if (message.guild.id !== "963755112508043314") return;
    if (dank.includes(message.author.id))
      message.embeds.forEach(async (e) => {
        if (!e.description) return;
        if (!e.author) return;
        if (
          e.author.name.includes(`${client.user.username}'s trivia question`)
        ) {
          const row = message.components[0];
          if (!row) return;
          let labelArray = [];
          const button = row.components.forEach((button_) =>
            labelArray.push(button_.label)
          );
          var item = labelArray[Math.floor(Math.random() * labelArray.length)];
          const findButton = row.components.find(
            (button_) => button_.label == item
          );
          if (!findButton) return;
          sleep(5000);
          findButton.click(message);
        }
      });
    if (message.content.includes("Where do you want to search?")) {
      const check_5 = message.mentions.users;
      check_5.forEach((user) => {
        if (user == client.user.id) {
          const row = message.components[0];
          if (!row) return;
          let labelArray = [];
          const button = row.components.forEach((button_) =>
            labelArray.push(button_.label)
          );
          var item = labelArray[Math.floor(Math.random() * labelArray.length)];
          const findButton = row.components.find(
            (button_) => button_.label == item
          );
          if (!findButton) return;
          sleep(5000);
          findButton.click(message);
        }
      });
    }
    if (message.content.includes("Dodge the Fireball")) {
      const check_5 = message.mentions.users;
      check_5.forEach((user) => {
        if (user == client.user.id) {
          const row = message.components[0];
          if (!row) return;
          let labelArray = [];
          const button = row.components.forEach((button_) =>
            labelArray.push(button_.label)
          );
          var item = labelArray[Math.floor(Math.random() * labelArray.length)];
          const findButton = row.components.find(
            (button_) => button_.label == item
          );
          if (!findButton) return;
          sleep(5000);
          findButton.click(message);
        }
      });
    }
    if (message.content.includes("Attack the boss by clicking")) {
      const row = message.components[0];
      if (!row) return;
      const item = "disinfect"
      const findButton = row.components.find(
        (button_) => button_.label == item
      );
      if (!findButton) return;
      sleep(5000);
      setInterval(function() {
        findButton.click(message);
      }, 1000)
    }
    if (
      message.content.includes(
        "You don't have a shovel, you need to go buy one. I'd hate to let you dig with your bare hands."
      )
    ) {
      const channeldank = config.dank.IDchannel;
      const sendDank = client.channels.cache.get(channeldank);
      sendDank.send("pls buy shovel");
    }
  }
  if (ONorOFF === true) {
    if (giveawayBot == "GiveawayBot") {
      if (
        message.author.id === "294882584201003009" &&
        message.content.includes(
          `<:yay:585696613507399692>   **GIVEAWAY**   <:yay:585696613507399692>`
        )
      ) {
        setTimeout(function () {
          message
            .react("🎉")
            .then(
              hook.send(
                language("giveaway", "joinGiveaway") +
                  `#**__${message.channel.name}__** (${message.guild.name})`
              )
            );
        }, waittime * 1000);
      }
      if (
        message.author.id === "294882584201003009" &&
        message.content.includes(`Congratulations <@${uid}>!`)
      ) {
        hook.send(
          language("giveaway", "winGiveaway") +
            `#**__${message.channel.name}__** (${message.guild.name})`
        );
      }
    } else if (giveawayBot == "CatBot") {
      if (message.author.id === "574812330760863744") {
        message.embeds.forEach(async (e) => {
          //  console.log(e)
          if (!e.title) return;
          if (!e.footer) return;
          if (!e.author) return;
          if (e.author.name.includes("GIVEAWAY STARTED")) {
            setTimeout(function () {
              message
                .react("740862018948694056")
                .then(
                  hook.send(
                    language("giveaway", "joinGiveaway") +
                      `#**__${message.channel.name}__** (${message.guild.name})`
                  )
                );
            }, waittime * 1000);
          }
        });
      }
      if (
        message.author.id === "574812330760863744" &&
        message.content.includes(`Congratz <@${uid}>, you won the giveaway`)
      ) {
        hook.send(
          language("giveaway", "winGiveaway") +
            `#**__${message.channel.name}__** (${message.guild.name})`
        );
      }
    }
  }
};

function closeServer() {
  server.close((err) => {
    console.log("server closed");
    process.exit(err ? 1 : 0);
  });
}

function clickEnterBattle(client, message) {
  message.embeds.forEach(async (e) => {
    if (!e.title) return;
    //if (!e.footer) return;

    if (e.title.includes("Challenging Area")) {
      const row = message.components[0];
      const button = row.components.find(
        (button_) =>
          button_.emoji.name == "✅" ||
          (button_.label == null && button_.style == "SUCCESS")
      );
      if (!button) return;
      button.click(message);
      logger.info("[BETA] Enter battle");
    }
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
