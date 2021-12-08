const { MessageEmbed } = require("discord.js");

function logPlaylist(message, count, url) {
  message.channel
  .send(
    new MessageEmbed()
      .setColor("#f6971c")
      .setAuthor(
        "Плейлист додано",
        "https://img.icons8.com/office/16/000000/cd--v2.gif"
      )
      .setThumbnail("https://marketplace.canva.com/EAEdeiU-IeI/1/0/1600w/canva-purple-and-red-orange-tumblr-aesthetic-chill-acoustic-classical-lo-fi-playlist-cover-jGlDSM71rNM.jpg")
      .addField("Кількість терків", count, true)
      .addField("Запит", message.author, true)
      .addField("URL", url)
      .setTimestamp()
      .setFooter("SDED Community ")
  )
}

module.exports = logPlaylist;