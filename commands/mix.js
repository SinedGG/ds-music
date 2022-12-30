const { SlashCommandBuilder } = require("discord.js");
const { connected, mix } = require("../modules/queue-control.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mix")
    .setDescription("Перемішати список відтворення"),

  async execute(interaction) {
    const guild_id = interaction.guild.id;

    if (connected(guild_id)) {
      mix(guild_id);
      interaction.reply("👌");
    } else interaction.reply("Зараз нічого не грає 😔");

    setTimeout(() => {
      interaction.deleteReply().catch((e) => {});
    }, 30000);
  },
};
