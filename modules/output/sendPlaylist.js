const { EmbedBuilder } = require("discord.js");
const { get_text } = require("../queue-control.js");
const bot = require("../../index.js");

module.exports = (interaction, list_id, size) => {
  const member_id = interaction.member.id;
  const embed = new EmbedBuilder()
    .setColor("#f6971c")
    .setAuthor({
      name: "Плейлист додано",
      iconURL: "https://img.icons8.com/office/16/000000/cd--v2.gif",
    })
    .setThumbnail(
      "https://marketplace.canva.com/EAEdeiU-IeI/1/0/1600w/canva-purple-and-red-orange-tumblr-aesthetic-chill-acoustic-classical-lo-fi-playlist-cover-jGlDSM71rNM.jpg"
    )
    .addFields(
      { name: "Кількість треків", value: `${size}`, inline: true },
      { name: "Запит", value: `<@${member_id}>`, inline: true },
      { name: "URL", value: `https://www.youtube.com/playlist?list=${list_id}` }
    )
    .setTimestamp();

  interaction.channel.send({ embeds: [embed] });
};
