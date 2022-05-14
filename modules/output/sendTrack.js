const toNormalTime = require("../toNormalTime.js");
const ytdl = require("ytdl-core");
const { MessageEmbed } = require("discord.js");

async function logTrack(message, servers, position) {
  var server = servers[message.guild.id];
  var ytdata = await ytdl.getBasicInfo(server.queue.url[position]);
  console.log(
    `Playing ${ytdata.videoDetails.title} requested by ${server.queue.requested[position].username} in guild ${message.guild.name}`
  );

  var embed = new MessageEmbed()
    .setColor("#f6971c")
    .setAuthor({
      name: "Зараз грає",
      iconURL: "https://img.icons8.com/office/16/000000/cd--v2.gif",
    })
    .setThumbnail(
      ytdata.player_response.videoDetails.thumbnail.thumbnails[0].url
    )
    .addFields(
      { name: "Назва", value: ytdata.videoDetails.title },
      {
        name: "Переглядів",
        value: ytdata.videoDetails.viewCount,
        inline: true,
      },
      {
        name: "Тривалість",
        value: toNormalTime(ytdata.videoDetails.lengthSeconds),
        inline: true,
      },
      { name: "Запит", value: `<@${server.queue.requested[position].id}>` , inline: true },
      { name: "URL", value: ytdata.videoDetails.video_url }
    )
    .setTimestamp()
    .setFooter({ text: "SDED Community " });
  message.channel.send({ embeds: [embed] }).then((embedMessage) => {
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
