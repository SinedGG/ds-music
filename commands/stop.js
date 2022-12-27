const { SlashCommandBuilder } = require("discord.js");
const queue = require("../modules/queue-control.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Зупинити відтворення"),
  async execute(interaction) {
    const guild_id = interaction.guild.id;
    queue.stop(guild_id);
    console.log(`Stopped in guild ${guild_id}`);
  },
};
