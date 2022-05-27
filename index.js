const Discord = require("discord.js-selfbot-v13");
const { Client, WebhookClient, User } = require("discord.js-selfbot-v13");
require("dotenv").config();
const {
  mobileStatus,
  syncStatus,
  notice,
  online247,
} = require("./config/mainConfig.json");
const {
  version,
  description,
  author,
  patch_version,
} = require("./package.json");
var colors = require("colors");
const { logger } = require("./utils/logger");
//const online = require("./utils/online.js");
const language = require("./utils/language.js");
const fs = require("fs");
const client = new Client({
  checkUpdate: notice.checkUpdatePackage,
  readyStatus: syncStatus,
  ws: {
    properties: {
      $browser: mobileStatus ? "Discord iOS" : "Discord Client",
    },
  },
});
const axios = require("axios");
global.logger = logger;
//const lang = "vi";
//const language = require("./language/" + lang + ".js");
const config = require("./config/gameConfig.js");
if (notice.newsMode === true) {
  axios
    .get(
      "https://raw.githubusercontent.com/hocsinhgioitoan/Mutil-tool/main/version.json"
    )
    .then((resp) => {
      logger.info("News: " + resp.data.news);
    });
}
if (notice.updateTool === true) {
  axios
    .get(
      "https://raw.githubusercontent.com/hocsinhgioitoan/Mutil-tool/main/version.json"
    )
    .then((resp) => {
      if (resp.data.version !== version) {
        console.log(
          "file: index.js ~ line 44 ~ .then ~ resp.data.version",
          resp.data.version
        );
        logger.warn(
          language("update", "newUpdate").red + resp.data.version.green
        );
        logger.update(`${language("update", "infoUpdate")} ${
          resp.data.version.green
        }
${language("update", "descriptionUpdate")}:
${resp.data.version_description}
${language(
  "update",
  "download"
)}: https://github.com/hocsinhgioitoan/Mutil-tool/releases/
${language(
  "update",
  "replitClone"
)}: https://replit.com/github/hocsinhgioitoan/Mutil-tool
`);
      } else if (resp.data.patch !== patch_version) {
        if (resp.data.patch_required === true) {
          logger.warn(
            language("update", "newPatchUpdate").red + resp.data.patch.green
          );
          logger.update(`${language("update", "patchUpdateInfo")}: ${
            resp.data.patch.green
          }
${language("update", "descriptionUpdate")}:
${resp.data.version_description}
${language(
  "update",
  "download"
)}: https://github.com/hocsinhgioitoan/Mutil-tool/releases/
${language(
  "update",
  "replitClone"
)}: https://replit.com/github/hocsinhgioitoan/Mutil-tool
`);
        }
      } else {
        logger.info(language("update", "noUpdate").green);
      }
    });
}

logger.info(
  `

  ███╗░░░███╗██╗░░░██╗██╗░░░░░████████╗██╗  ████████╗░█████╗░░█████╗░██╗░░░░░
  ████╗░████║██║░░░██║██║░░░░░╚══██╔══╝██║  ╚══██╔══╝██╔══██╗██╔══██╗██║░░░░░
  ██╔████╔██║██║░░░██║██║░░░░░░░░██║░░░██║  ░░░██║░░░██║░░██║██║░░██║██║░░░░░
  ██║╚██╔╝██║██║░░░██║██║░░░░░░░░██║░░░██║  ░░░██║░░░██║░░██║██║░░██║██║░░░░░
  ██║░╚═╝░██║╚██████╔╝███████╗░░░██║░░░██║  ░░░██║░░░╚█████╔╝╚█████╔╝███████╗
  ╚═╝░░░░░╚═╝░╚═════╝░╚══════╝░░░╚═╝░░░╚═╝  ░░░╚═╝░░░░╚════╝░░╚════╝░╚══════╝
${language("introduce", "madeBy")} ${author} ${language(
    "introduce",
    "version"
  )}${version} - ${description}
`.blue
);

function init() {
  loadEvent();
  //online();
}
init();
process.on("unhandledRejection", (error) => {
  console.error(error);
  if (notice.notice === true) {
    if (!process.env.WH_URL) {
      return logger.error(language("WH", "invalidWH"));
    } else {
      const WebHookClient = new Discord.WebhookClient({
        url: process.env.WH_URL,
      });
      WebHookClient.send({
        content: "🚨 **ERROR**\n\n```" + error + "```",
      });
    }
  }
});

client.login(process.env["token"] || process.env["TOKEN"]); // Don't paste your token here
function loadEvent() {
  fs.readdirSync("./src/events").forEach((category) => {
    const eventsFiles = fs
      .readdirSync("./src/events/" + category + "/")
      .filter((file) => file.endsWith("js"));
    for (const file of eventsFiles) {
      let event = require("./src/events/" + category + "/" + file);
      logger.info(
        "[EVENTS]".cyan +
          " Event " +
          file.blue +
          " of the category " +
          category.magenta +
          " loaded"
      );
      client.on(file.split(".")[0], (...args) => event(client, ...args));
    }
  });
}

const d = new Date();
const x = d / 1000;
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Your selfbot is online!");
});
if (online247 === true) {
  app.listen(3000, () => {
    logger.info("Web is used to host 24/7 online ");
  });
}

const mySecret = process.env["WH_URL"];
const hook1 = new WebhookClient({
  url: mySecret,
});

if (config.fisher.ONorOFF === true) {
  logger.warn("BETA FISH AUTO. YOU WILL GET BAN ANY TIME FROM IT!!");
}
if (config.aniGame.ONorOFF === true) {
  logger.warn(
    "BETA ANI GAME AUTO. YOU WILL GET BAN ANY TIME FROM IT, BUGG, TOOO!!"
  );
  logger.info(
    "To use ani game mode, you need to message " +
      config.aniGame.serverPrefix +
      "bt to automatic"
  );
}
