const Discord = require("discord.js-selfbot-v13");
const {
    Client,
    WebhookClient,
    User
} = require("discord.js-selfbot-v13");
const {
    checkUpdatePackage,
    mobileStatus,
    syncStatus,
    notice,
    updateTool,
    spamMessage,
    fullUserName
} = require("./config/mainConfig.json");
const {
    version,
    description,
    name,
    author,
    patch_version,
} = require("./package.json");
const {
    giveawayBot,
    waittime,
    uid,
    dmToHost,
    ONorOFF
} = require("./config/giveawayConfig.json")
var colors = require("colors");
const {
    logger
} = require("./utils/logger");
//const online = require("./utils/online.js");
const language = require("./utils/language.js")
const fs = require("fs");
const client = new Client({
    checkUpdate: checkUpdatePackage,
    readyStatus: syncStatus,
    ws: {
        properties: {
            $browser: mobileStatus ? "Discord iOS" : "Discord Client",
        },
    },
});
console.log(client.user)
const axios = require("axios");
const SourceBin = require("sourcebin-wrapper");
//const lang = "vi";
//const language = require("./language/" + lang + ".js");
const config = require("./config/gameConfig.js");
if (updateTool === true) {
    axios
        .get(
            "https://raw.githubusercontent.com/hocsinhgioitoan/Mutil-tool/main/version.json"
        )
        .then((resp) => {
            if (resp.data.version !== version) {
                logger.warn(
                    language("update", "newUpdate").red + resp.data.version.green
                );
                logger.update(`${language("update", "infoUpdate")} ${resp.data.version.green}
${language("update","descriptionUpdate")}:
${resp.data.version_description}
${language("update","download")}: https://github.com/hocsinhgioitoan/Mutil-tool/releases/
${language("update","replitClone")}: https://replit.com/github/hocsinhgioitoan/Mutil-tool
`);
            } else if (resp.data.patch !== patch_version) {
                if (resp.data.patch_required === true) {
                    logger.warn(
                        language("update", "newPatchUpdate").red + resp.data.patch.green
                    );
                    logger.update(`${language("update","patchUpdateInfo")}: ${resp.data.patch.green}
${language("update","descriptionUpdate")}:
${resp.data.version_description}
${language("update","download")}: https://github.com/hocsinhgioitoan/Mutil-tool/releases/
${language("update","replitClone")}: https://replit.com/github/hocsinhgioitoan/Mutil-tool
`);
                }
            } else {
                logger.info(language("update", "noUpdate").green);
            }
        });
}

logger.info(
    `
███╗░░░███╗██╗░░░██╗████████╗██╗██╗░░░░░░██████╗  ████████╗░█████╗░░█████╗░██╗░░░░░
████╗░████║██║░░░██║╚══██╔══╝██║██║░░░░░██╔════╝  ╚══██╔══╝██╔══██╗██╔══██╗██║░░░░░
██╔████╔██║██║░░░██║░░░██║░░░██║██║░░░░░╚█████╗░  ░░░██║░░░██║░░██║██║░░██║██║░░░░░
██║╚██╔╝██║██║░░░██║░░░██║░░░██║██║░░░░░░╚═══██╗  ░░░██║░░░██║░░██║██║░░██║██║░░░░░
██║░╚═╝░██║╚██████╔╝░░░██║░░░██║███████╗██████╔╝  ░░░██║░░░╚█████╔╝╚█████╔╝███████╗
╚═╝░░░░░╚═╝░╚═════╝░░░░╚═╝░░░╚═╝╚══════╝╚═════╝░  ░░░╚═╝░░░░╚════╝░░╚════╝░╚══════╝
${language("introduce", "madeBy")} ${author} ${language("introduce", "version")}${version} - ${description}
`.blue
);
var AsciiTable = require('ascii-table')
var table = new AsciiTable('GAME MODE: Ani Game')
table
    .setHeading('', 'Name', 'Status')
    .addRow(1, 'Ani Game: ', config.aniGame.ONorOFF)
    .addRow(2, 'Auto Battle', config.aniGame.autoBattle)
var table1 = new AsciiTable('GAME MODE: Fisher')
table1
    .setHeading('', 'Name', 'Status')
    .addRow(1, 'Fisher: ', config.fisher.ONorOFF)
    .addRow(2, 'Auto Change Channel', config.fisher.randomChannel)
var table2 = new AsciiTable('MODE: Giveaway')
table2
    .setHeading('', 'Name', 'Status')
    .addRow(1, 'Giveaway: ', ONorOFF)
    .addRow(2, 'Giveaway Bot', config.fisher.giveawayBot)
console.log(table.toString())
console.log(table1.toString())

function init() {
    loadEvent();
    //online();
}
init();
process.on("unhandledRejection", (error) => {
    if (notice === true) {
        if (!process.env.WH_URL) {
            return logger.error(
                language("WH", "invalidWH")
            );
        } else {
            console.error(error);
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
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('Your selfbot is online!')
});
var server = app.listen(3000, () => {
    logger.info('Web is used to host 24/7 online ');
});
const mySecret = process.env['WH_URL']
const hook1 = new WebhookClient({
    url: mySecret
});

if (config.fisher.ONorOFF === true) {
    logger.warn("BETA FISH AUTO. YOU WILL GET BAN ANY TIME FROM IT!!")
}
const anigame = ["571027211407196161"]; //Anigame ID
const fisher = ["574652751745777665"];

client.on("messageCreate", async (message) => {
    if (config.aniGame.ONorOFF === true) {
        if (anigame.includes(message.author.id)) {
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
                        const hook = new WebhookClient({
                            url: config.aniGame.webhook
                        });
                        hook.send(
                            `<t:${Math.floor(x)}:R> | Claimed card in [${
              message.channel.name
            }](${message.channel.url})`
                        );
                        logger.info(language("aniGame", "claimedCard")(message.channel.name));
                    }
                })
                message.embeds.forEach(async (e) => {
                    if (!e.title) return
                    if (!e.description) return
                    if (e.title.includes(`**Successfully claimed by __${fullUserName}__** <:claimed:896016100976910346>`)) {
                        const des = e.description
                        const rarity = des.split("__", 2).toString()
                        const r = rarity.slice(1)
                        const name = des.split("**", 2)
                        const n = name.slice(1).toString()
                        if (r == "Rare" || r == "Ultra Rare" || r == "Super Rare") {
                            console.log(r + " | " + n)
                            hook1.send(`You got ` + r + "name is" + n)
                        }
                    }
                })
            }
            if (config.aniGame.autoBattle === true) {
                clickEnterBattle(client, message)
                setInterval(function() {

                    sendNextFloor(client, message)
                    clickEnterBattle(client, message)
                    //checkFloor(client, message)

                }, 30000)

            }
        }
    }
    if (config.fisher.ONorOFF === true) {

        if (fisher.includes(message.author.id)) {
            message.embeds.forEach(async (e) => {
                if (!e.title) return;
                if (!e.footer) return;
                if (e.title.includes("Anti-bot")) {
                    hook1.send(
                        `<t:${Math.floor(x)}R:> | got captcha in ${message.channel.name}`)
                    closeServer()
                }
                if (e.title.includes("You caught:")) {
                    setInterval(function() {
                        const label = "Sell";
                        const row = message.components[0];
                        if (!row) return
                        const button = row.components.find(
                            (button_) => button_.label == label
                        );
                        if (!button) return;
                        button.click(message);
                        logger.info("Sell fish")
                    }, 1000 * 60)
                }
            })
        }
    }
    if (ONorOFF === true) {
        if (giveawayBot == "GiveawayBot") {
            if (message.author.id === "294882584201003009" && message.content.includes(`<:yay:585696613507399692>   **GIVEAWAY**   <:yay:585696613507399692>`)) {
                setTimeout(function() {
                    message.react('🎉').then(hook1.send(language("giveaway", "joinGiveaway") + `#**__${message.channel.name}__** (${message.guild.name})`))
                }, waittime * 1000);
            };
            if (message.author.id === "294882584201003009" && message.content.includes(`Congratulations <@${uid}>!`)) {
                hook1.send(language("giveaway", "winGiveaway") + `#**__${message.channel.name}__** (${message.guild.name})`)
            };

        } else if (giveawayBot == "CatBot") {
            if (message.author.id === "574812330760863744") {
                message.embeds.forEach(async (e) => {
                    //  console.log(e)
                    if (!e.title) return;
                    if (!e.footer) return;
                    if (e.author.name.includes("GIVEAWAY STARTED")) {
                        setTimeout(function() {
                            message.react('740862018948694056').then(
                                hook1.send(language("giveaway", "joinGiveaway") + `#**__${message.channel.name}__** (${message.guild.name})`))
                        }, waittime * 1000);
                    }
                })
            };
            if (message.author.id === "574812330760863744" && message.content.includes(`Congratz <@${uid}>, you won the giveaway`)) {
                hook1.send(language("giveaway", "winGiveaway") + `#**__${message.channel.name}__** (${message.guild.name})`)
            };
        }
    }

})

function closeServer() {
    server.close((err) => {
        console.log('server closed')
        process.exit(err ? 1 : 0)
    })
}

function sendNextFloor(client, message) {
    message.embeds.forEach(async (e) => {
        if (!e.footer) return



        if (e.title.includes("Victory") && e.author.name.includes(client.user.username)) {

            message.channel.send(".fl n")
            logger.info("[BETA] Sent next floor")
            message.channel.send(".bt")
            logger.info("[BETA] Sent battle")

        } else if (e.title.includes("Error ⛔") && e.description("you have not unlocked this floor yet! Please clear all previous floors in this location first.")) {
            logger.info("[BETA] Waiting")
            sleep(15000)
        }
    })
}

function clickEnterBattle(client, message) {
    message.embeds.forEach(async (e) => {
        if (!e.title) return;
        //if (!e.footer) return;

        if (
            e.title.includes("Challenging Area")
        ) {

            const row = message.components[0];
            const button = row.components.find(
                (button_) => button_.emoji.name == "✅" || button_.label == null && button_.style == 'SUCCESS'
            );
            if (!button) return;
            button.click(message);
            logger.info("[BETA] Enter battle")
        }
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}