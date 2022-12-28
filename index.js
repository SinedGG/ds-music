require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

/*
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});
*/

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  const reg = require("./modules/register-command.js");
  const d = require("./modules/commands-handling.js");
  reg(bot);
  d(bot);
});

//bot.on("messageCreate", (message) => {});

bot.login(process.env.DS_TOKEN);

module.exports = bot;
