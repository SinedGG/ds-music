const { SlashCommandBuilder } = require("discord.js");
const queue = require("../modules/queue-control.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Зупинити відтворення")
    .addIntegerOption((option) =>
      option.setName("number").setDescription("Кількість треків для пропуску")
    ),
  async execute(interaction) {
    const guild_id = interaction.guild.id;

    if (queue.connected(guild_id)) {
      const param = interaction.options.getInteger("number");
      queue.skip(guild_id, param);
      interaction.reply("👌");
    } else interaction.reply("Зараз нічого не грає 😔");
  },
};
