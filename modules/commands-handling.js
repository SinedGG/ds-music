module.exports = async (bot) => {
  const { Collection, Events } = require("discord.js");
  const fs = require("fs");
  bot.commands = new Collection();

  const commandsPath = "./commands";
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = commandsPath + "/" + file;
    const command = require("." + filePath);
    if ("data" in command && "execute" in command) {
      bot.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }

  bot.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
    }
  });

  bot.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isButton()) return;
    console.log(interaction);
    const guild_id = interaction.guild.id;

    const queue = require("./queue-control.js");
    const bot = require("../index.js");

    const channel = bot.channels.cache.get(queue.get_text(guild_id));
    channel.messages.fetch(queue.get_message(guild_id)).then((message) => {
      console.log(message);
      return message.update({
        components: [],
      });
    });
  });
};
