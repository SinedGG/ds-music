require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  require("./modules/register-command.js")(bot);
  require("./handler/commands.js")(bot);
  require("./handler/buttons.js")(bot);
  require("./handler/event.js")(bot);
});

bot.login(process.env.DS_TOKEN);

module.exports = bot;
