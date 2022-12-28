const { SlashCommandBuilder } = require("discord.js");
const wait = require("timers/promises").setTimeout;
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

    await wait(5000);
    interaction.deleteReply().catch((e) => {});
  },
};
