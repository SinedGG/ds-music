const { SlashCommandBuilder, Guild } = require("discord.js");
const pre_check = require("../modules/check-voice-channel.js");
const separate_url = require("../modules/separate-url.js");
const play = require("../modules/play-song.js");
const queue = require("../modules/queue-control.js");
const connect = require("../modules/connect.js");
const search = require("../modules/search.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("radio")
    .setDescription("Пошук схожих треків")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("Вкажіть url посилання")
        .setRequired(true)
    ),

  async execute(interaction) {
    const guild_id = interaction.guild.id;
    const member_id = interaction.member.id;

    if (!pre_check(interaction)) return;
    interaction.deferReply();
    try {
      const param = interaction.options.getString("url");
      var id = await search(param, guild_id, member_id);

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
  },
};
