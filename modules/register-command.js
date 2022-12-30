module.exports = async (bot) => {
  require("dotenv").config();

  const { REST, Routes } = require("discord.js");
  const fs = require("fs");

  const commands = [];
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
  }
  const guilds = bot.guilds.cache.map((guild) => guild.id);

  const rest = new REST({ version: "10" }).setToken(process.env.DS_TOKEN);
  for (let i = 0; i < guilds.length; i++) {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      );
      const data = await rest.put(
        Routes.applicationGuildCommands(process.env.DS_CLIENT_ID, guilds[i]),
        { body: commands }
      );
      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      console.error(error);
    }
  }
};
