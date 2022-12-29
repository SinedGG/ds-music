const { SlashCommandBuilder } = require("discord.js");
const { connected, stop } = require("../modules/queue-control.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Зупинити відтворення"),
  async execute(interaction) {
    const guild_id = interaction.guild.id;

    if (connected(guild_id)) {
      stop(guild_id);
      interaction.reply("👌");
    } else interaction.reply("Немає що зупиняти 🤦🏻‍♂️");

    setTimeout(() => {
      interaction.deleteReply().catch((e) => {});
    }, 30000);
  },
};
