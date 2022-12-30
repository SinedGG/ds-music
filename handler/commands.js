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
};
