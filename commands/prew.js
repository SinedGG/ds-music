const { SlashCommandBuilder } = require("discord.js");
const { connected, prew } = require("../modules/queue-control.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prew")
    .setDescription("Попередній трек")
    .addIntegerOption((option) =>
      option.setName("number").setDescription("Кількість треків для пропуску")
    ),

  async execute(interaction) {
    const guild_id = interaction.guild.id;

    if (connected(guild_id)) {
      const param = interaction.options.getInteger("number");
      prew(guild_id, param);
      interaction.reply("👌");
    } else interaction.reply("Зараз нічого не грає 😔");

    setTimeout(() => {
      interaction.deleteReply().catch((e) => {});
    }, 30000);
  },
};
