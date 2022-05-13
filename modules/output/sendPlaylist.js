const { MessageEmbed } = require("discord.js");

function logPlaylist(message, count, url) {
  console.log(
    `Plailist size - ${count} requested by ${message.author.username} in guild ${message.guild.name}`
  );
    const embed = new MessageEmbed()
      .setColor("#f6971c")
      .setAuthor({ name: "Плейлист додано", iconURL: "https://img.icons8.com/office/16/000000/cd--v2.gif" })
      .setThumbnail("https://marketplace.canva.com/EAEdeiU-IeI/1/0/1600w/canva-purple-and-red-orange-tumblr-aesthetic-chill-acoustic-classical-lo-fi-playlist-cover-jGlDSM71rNM.jpg")
      .addFields(
        { name: "Кількість терків", value: count.toString(), inline: true },
        { name: "Запит", value: `<@${message.author.id}>`, inline: true },
        { name: "URL", value: url}
      )
      .setTimestamp()
      .setFooter({ text: "SDED Community " });
      message.channel.send({ embeds: [embed] });
}

module.exports = logPlaylist;