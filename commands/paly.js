const { SlashCommandBuilder, Guild } = require("discord.js");
const pre_check = require("../modules/check-voice-channel.js");
const separate_url = require("../modules/separate-url.js");
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
    const guild_id = interaction.guild.id;
    const member_id = interaction.member.id;

    if (!pre_check(interaction)) return;
    console.log(interaction);
    //interaction.deferReply();
    try {
      const param = interaction.options.getString("url-or-name");
      var id = await search(param);

      queue.create(guild_id);
      queue.push(guild_id, member_id, id);
      queue.sessions[guild_id].last_message = interaction.channelId;

      if (!queue.connected(guild_id)) {
        connect(interaction.member.voice);
        play(guild_id);
      }
      //interaction.reply("👌");
    } catch (error) {
      console.log(`play error `);
      console.log(error);
    }
    /*
    const info = await ytdl.getBasicInfo(url, {
      requestOptions: {
        headers: {
          cookie: process.env.COOKIE,
        },
      },
    });
    */
  },
};
