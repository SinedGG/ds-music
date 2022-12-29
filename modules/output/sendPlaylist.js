const { EmbedBuilder } = require("discord.js");
const { get_text } = require("../queue-control.js");
const bot = require("../../index.js");

module.exports = (guild_id, requested, size) => {
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
      { name: "Кількість терків", value: size, inline: true },
      { name: "Запит", value: `<@${requested}>`, inline: true },
      { name: "URL", value: url }
    )
    .setTimestamp();
  const channel = bot.channels.cache.get(get_text(guild_id));
  channel.send({ embeds: [embed] });
};
