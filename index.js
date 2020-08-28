const { Telegraf } = require("telegraf");
const fs = require("fs");
require("dotenv").config();
const fetch = require("node-fetch");
const bot = new Telegraf(process.env.BOT_TOKEN);
const cmds = JSON.parse(fs.readFileSync("mCommands.json"));

//Greetings on user enter
bot.start(async (ctx) => {
    await ctx.replyWithHTML(
        `Welcome to Minecraft ID bot, where you can find all creatures and item Id's. Special thanks to Graham Edgecombi who made all this real 😉.
        \nWant to find your favorite item id ? Enter <i>/item</i> and needed item or creature (<i>/item stone</i>)
        \nIf you want to search for the right command, use <i>/cmd</i>. It will look like this (<i>/cmd tp</i>). 
        \nIf you want full info about it, just enter it full name with "/" or just click on it
        \n"Good luck !"`
    );
});

//Searches for items. Filtering them depending on meta and type numbers
bot.command("/item", (ctx) => {
    searchItem = ctx.message.text.toUpperCase().split(" ")[1];
    fetch("http://minecraft-ids.grahamedgecombe.com/items.json")
        .then((res) => res.json())
        .then((json) => {
            for (let item of json) {
                if (item.name.toUpperCase().indexOf(searchItem) > -1) {
                    if (item.meta == 0) {
                        ctx.replyWithHTML(
                            `<code>${item.type}</code>  ${item.name}  <i>(minecraft: <u>${item.text_type}</u> )</i>`
                        );
                    } else {
                        ctx.replyWithHTML(
                            `<code>${item.type}:${item.meta}</code>  ${item.name}  <i>(minecraft: <u>${item.text_type}</u> )</i>`
                        );
                    }
                }
            }
        });
});

//Searches for command with simular part of word, responds with command name
bot.command("/cmd", (ctx) => {
    searchItem = ctx.message.text.toUpperCase().split(" ")[1];
    for (cmd of cmds) {
        if (cmd.Command.toUpperCase().indexOf(searchItem) > -1) {
            ctx.reply(cmd.Command);
        }
    }
});

//Searching for the mc commands, depending on messege text. Replies with full command description.
bot.on("text", (ctx) => {
    const msg = ctx.message.text;
    for (cmd of cmds) {
        if (msg == cmd.Command) {
            ctx.replyWithHTML(
                `<b>Command name:</b> ${cmd.Command} 
                \n<b>Description:</b> ${cmd.Description} 
                \n<b>BE:</b> ${cmd.BE} 
                \n<b>EE:</b> ${cmd.EE} 
                \n<b>JE:</b> ${cmd.JE} 
                \n<b>OP level:</b> ${cmd["OP level"]} 
                \n<b>MP only:</b> ${cmd["MP only"]} 
                \n<b>Command modifies or queries blocks:</b> ${cmd["Command modifies or queries blocks"]}
                \n<b>Command modifies or queries entities (mobs, dropped items, etc.):</b> ${cmd["Command modifies or queries entities (mobs, dropped items, etc.)"]}
                \n<b>Command modifies or queries players:</b> ${cmd["Command modifies or queries players"]}
                \n<b>Command modifies or queries the world:</b> ${cmd["Command modifies or queries the world"]}
                `
            );
        }
    }
});

bot.launch();
