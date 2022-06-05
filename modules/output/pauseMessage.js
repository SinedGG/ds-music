const { MessageEmbed } = require("discord.js");

function pause(message) {
  const embed = new MessageEmbed()
    .setColor("#f6971c")
    .setTitle("Відтворення призупинено.");
  message.channel.send({ embeds: [embed] }).then((embedMessage) => {
    embedMessage.react("⏯️");
  });
}

module.exports = pause;
