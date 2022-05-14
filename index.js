require("dotenv").config();
const { Client, Intents } = require("discord.js");
const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

bot.config = { YT_TOKEN: process.env.YT_TOKEN };
bot.servers = {};

const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  require("./events/message.js")(bot, db);
  require("./events/reactionAdd.js")(bot);
  require("./events/disconnect.js")(bot);
});

bot.login(process.env.TOKEN);
