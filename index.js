const Discord = require('discord.js-selfbot-v13');
const {
    Client
} = require('discord.js-selfbot-v13');
const {
    checkUpdatePackage,
    mobileStatus,
    syncStatus,
    notice
} = require("./config/mainConfig.json")
const {
    version,
    description,
    name,
    author,
    patch_version
} = require("./package.json")
var colors = require('colors');
const {
    logger
} = require("./utils/logger");
const online = require("./utils/online.js")
const fs = require('fs');
const client = new Client({
    checkUpdate: checkUpdatePackage,
    readyStatus: syncStatus,
    ws: {
        properties: {
            $browser: mobileStatus ? "Discord iOS" : "Discord Client"
        }
    },
})
const axios = require('axios');
const SourceBin = require('sourcebin-wrapper');


axios.get('https://raw.githubusercontent.com/hocsinhgioitoan/Mutil-tool/main/version.json').then(resp => {
    if (resp.data.version !== version) {
        logger.warn("There is a new update, please update to the new version: ".red + resp.data.version.green)
        logger.update(`Info update: ${resp.data.version.green}
Description:
${resp.data.version_description}
Download here: https://github.com/hocsinhgioitoan/Mutil-tool/releases/
Clone replit: https://replit.com/github/hocsinhgioitoan/Mutil-tool
`)
    } else if (resp.data.patch !== patch_version) {
        logger.warn("There is a new patch update, please update to the new version: ".red + resp.data.patch.green)
        logger.update(`Info patch update: ${resp.data.patch.green}
Description:
${resp.data.patch_description}
Download here: https://github.com/hocsinhgioitoan/Mutil-tool/releases/
Clone replit: https://replit.com/github/hocsinhgioitoan/Mutil-tool
`)
    } else {
        logger.info(`No new updates at the moment, feel free`.green)
    }
});

logger.info(`
███╗░░░███╗██╗░░░██╗████████╗██╗██╗░░░░░░██████╗  ████████╗░█████╗░░█████╗░██╗░░░░░
████╗░████║██║░░░██║╚══██╔══╝██║██║░░░░░██╔════╝  ╚══██╔══╝██╔══██╗██╔══██╗██║░░░░░
██╔████╔██║██║░░░██║░░░██║░░░██║██║░░░░░╚█████╗░  ░░░██║░░░██║░░██║██║░░██║██║░░░░░
██║╚██╔╝██║██║░░░██║░░░██║░░░██║██║░░░░░░╚═══██╗  ░░░██║░░░██║░░██║██║░░██║██║░░░░░
██║░╚═╝░██║╚██████╔╝░░░██║░░░██║███████╗██████╔╝  ░░░██║░░░╚█████╔╝╚█████╔╝███████╗
╚═╝░░░░░╚═╝░╚═════╝░░░░╚═╝░░░╚═╝╚══════╝╚═════╝░  ░░░╚═╝░░░░╚════╝░░╚════╝░╚══════╝
Made by ${author} Verion v${version} - ${description}
`.blue)

function init() {
    loadEvent()
    online()
}
init()
process.on('unhandledRejection', error => {
    if (notice === true) {
        if (!process.env.WH_URL) {
            return logger.error("Invalid Webhook Link. Please check here https://github.com/hocsinhgioitoan/Mutil-tool#env-required")
        } else {
            console.error(error)
            const WebHookClient = new Discord.WebhookClient({
                url: process.env.WH_URL
            });
            WebHookClient.send({
                content: '🚨 **ERROR**\n\n```' + error + '```'
            });
        }
    }
});
client.login(process.env["token"] || process.env["TOKEN"]); // Don't paste your token here 
function loadEvent() {
    fs.readdirSync('./src/events').forEach((category) => {
        const eventsFiles = fs.readdirSync('./src/events/' + category + '/').filter((file) => file.endsWith('js'));
        for (const file of eventsFiles) {
            let event = require('./src/events/' + category + '/' + file);
            logger.info('[EVENTS]'.cyan + ' Event ' + file.blue + ' of the category ' + category.magenta + ' loaded')
            client.on(file.split(".")[0], (...args) => event(client, ...args));
        };
    });
}