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
bot.command("/search", (ctx) => {
  searchItem = ctx.message.text.toUpperCase().split(" ")[1];
  console.log(searchItem);
  fetch("http://minecraft-ids.grahamedgecombe.com/items.json")
    .then((res) => res.json())
    .then((json) => {
      for (let item of json) {
        if (item.name.toUpperCase().indexOf(searchItem) > -1) {
          if (item.meta <= 0) {
            ctx.replyWithHTML(
              `<code>${item.type}</code>  ${item.name}  <i>(minecraft:${item.text_type})</i>`
            );
          } else {
            ctx.replyWithHTML(
              `<code>${item.type}:${item.meta}</code>  ${item.name}  <i>(minecraft: <b>${item.text_type}</b>)</i>`
            );
          }
        }
      }
    });
});
// bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();
