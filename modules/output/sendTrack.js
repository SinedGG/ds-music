const format_time = require("../format-time.js");
const { EmbedBuilder } = require("discord.js");
const bot = require("../../index.js");
const button = require("./buttons.js");

module.exports = (info, requested, channel_id) => {
  const embed = new EmbedBuilder()
    .setColor("#f6971c")
    .setAuthor({
      name: "Зараз грає",
      iconURL: "https://img.icons8.com/office/16/000000/cd--v2.gif",
    })
    .setThumbnail(
      info.player_response.videoDetails.thumbnail.thumbnails.pop().url
    )
    .addFields(
      { name: "Назва", value: info.videoDetails.title },
      {
        name: "Переглядів",
        value: info.videoDetails.viewCount,
        inline: true,
      },
      {
        name: "Тривалість",
        value: format_time(info.videoDetails.lengthSeconds),
        inline: true,
      },
      {
        name: "Запит",
        value: `<@${requested}>`,
        inline: true,
      },
      {
        name: "Відвторити знову",
        value: `[Клац](https://ds-music.sded.cf/play?guild=&url=${info.videoDetails.video_url})`,
      },
      { name: "URL", value: info.videoDetails.video_url }
    )
    .setTimestamp();

  const channel = bot.channels.cache.get(channel_id);
  channel.send({ embeds: [embed], components: [button] });
  /*
message.channel.send({ embeds: [embed] }).then((embedMessage) => {
  servers[message.guild.id].last_message = embedMessage;
  reactionPanel(embedMessage);
});
*/
};
