const Discord = require("discord.js");
require("dotenv").config();
const bot = new Discord.Client();

bot.config = { YT_TOKEN: process.env.YT_TOKEN, music_channel: process.env.MUSIC_CHANNEL };
bot.servers = {};
const ready = require("./events/ready.js");
ready(bot);

const message = require("./events/message.js");
message(bot);

const reaction = require("./events/reactionAdd.js");
reaction(bot);

const disconnect = require("./events/disconnect.js");
disconnect(bot);

bot.login(process.env.TOKEN);
