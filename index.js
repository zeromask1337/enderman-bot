const { Telegraf } = require("telegraf");
require("dotenv").config();
const fetch = require("node-fetch");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(
    "Welcome to Minecraft ID bot, where you can find all creatures and item Id's. Special thanks to Graham Edgecombi who made all this real 😉"
  )
);
bot.help((ctx) =>
  fetch("http://minecraft-ids.grahamedgecombe.com/items.json")
    .then((res) => res.json())
    .then((json) => ctx.reply(json[20].name))
);
// bot.on("sticker", (ctx) => ctx.reply("👍"));
// bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();
