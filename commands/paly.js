const { SlashCommandBuilder } = require("discord.js");
const pre_check = require("../modules/check-voice-channel.js");
const play = require("../modules/play-song.js");
const queue = require("../modules/queue-control.js");
const connect = require("../modules/connect.js");
const search = require("../modules/search.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("play.")
    .addStringOption((option) =>
      option
        .setName("url-or-name")
        .setDescription("Вкажіть url посилання")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const guild_id = interaction.guild.id;
    const member_id = interaction.member.id;

    if (!pre_check(interaction)) return;
    try {
      const param = interaction.options.getString("url-or-name");
      var id = await search(interaction, param);
      queue.create(guild_id);
      queue.push(guild_id, member_id, id);

      if (!queue.connected(guild_id)) {
        connect(interaction.member.voice);
        queue.set_text(guild_id, interaction.channelId);
        play(guild_id, queue.next(guild_id));
      }
      interaction.editReply("👌");
    } catch (error) {
      interaction.editReply("Не вдалось нічого знайти");
      console.log(error);
    }

    setTimeout(() => {
      interaction.deleteReply().catch((e) => {});
    }, 30000);
  },
};
