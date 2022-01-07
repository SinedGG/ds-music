const toNormalTime = require("../toNormalTime.js");
const ytdl = require("ytdl-core");
const { MessageEmbed } = require("discord.js");

async function logTrack(message, servers, position) {
  var server = servers[message.guild.id];
  var ytdata = await ytdl.getBasicInfo(server.queue.url[position]);
  message.channel
    .send(
      new MessageEmbed()
        .setColor("#f6971c")
        .setAuthor(
          "Зараз грає",
          "https://img.icons8.com/office/16/000000/cd--v2.gif"
        )
        .setThumbnail(
          ytdata.player_response.videoDetails.thumbnail.thumbnails[0].url
        )
        .addField("Назва", ytdata.videoDetails.title)
        .addField("Переглядів", ytdata.videoDetails.viewCount, true)
        .addField(
          "Тривалість",
          toNormalTime(ytdata.videoDetails.lengthSeconds),
          true
        )
        .addField("Запит", server.queue.reuested[position], true)
        .addField("URL", ytdata.videoDetails.video_url)
        .setTimestamp()
        .setFooter("SDED Community ")
    )
    .then((embedMessage) => {
      servers[message.guild.id].last_message = embedMessage;
      reactionPanel(embedMessage);
    });
}

function reactionPanel(embed) {
  embed.react("⏮", "✔️");
  embed.react("⏹️");
  embed.react("⏭");
}

module.exports = logTrack;
