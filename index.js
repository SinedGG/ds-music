const Discord = require("discord.js");
require("dotenv").config();
const bot = new Discord.Client();

bot.config = { YT_TOKEN: process.env.YT_TOKEN, music_channel: process.env.MUSIC_CHANNEL };
bot.servers = {};


bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  require("./events/message.js")(bot);
  require("./events/reactionAdd.js")(bot);
  require("./events/disconnect.js")(bot);
});



bot.login(process.env.TOKEN);
