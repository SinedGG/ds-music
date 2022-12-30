const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const db = require("../db.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-channel")
    .setDescription("Встановити музичний канал")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Виберіть текстовий канал")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    if (channel.type != 0) interaction.reply("Канал має бути текстовим!");
    await interaction.deferReply();
    try {
      await db.query(
        `INSERT INTO channels (guild_id, channel_id)
         VALUES (?,?)
         ON DUPLICATE KEY UPDATE channel_id = ?`,
        [channel.guildId, channel.id, channel.id]
      );
      interaction.editReply("👌");
    } catch (error) {
      console.log(error);
      interaction.editReply(`Нажаль сталась помилка`);
    }
  },
};
