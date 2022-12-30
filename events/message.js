const { Events } = require("discord.js");
const db = require("../db.js");

const pre_check = require("../modules/check-voice-channel.js");
const play = require("../modules/play-song.js");
const queue = require("../modules/queue-control.js");
const connect = require("../modules/connect.js");
const search = require("../modules/search.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(interaction) {
    if (
      interaction.content.includes("youtube.com") ||
      interaction.content.includes("youtu.be")
    ) {
      const [res] = await db.query(
        `SELECT * FROM channels WHERE guild_id = ${interaction.guildId}`
      );
      if (res.length == 0 || interaction.channelId != res[0].channel_id) return;

      const guild_id = interaction.guild.id;
      const member_id = interaction.member.id;

      if (!pre_check(interaction)) return;
      try {
        var id = await search(interaction, interaction.content);
        queue.create(guild_id);
        queue.push(guild_id, member_id, id);

        if (!queue.connected(guild_id)) {
          connect(interaction.member.voice);
          queue.set_text(guild_id, interaction.channelId);
          play(guild_id, queue.next(guild_id));
        }
        interaction.react("👌");
      } catch (error) {
        interaction.react("❌");
        console.log(error);
      }
      setTimeout(() => {
        interaction.delete().catch((e) => {});
      }, 3000);
    }
  },
};
