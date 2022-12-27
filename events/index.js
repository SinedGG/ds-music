const { MessageEmbed } = require("discord.js");

module.exports = {
  help: function (message) {
    const embed = new MessageEmbed()
    .setColor("#f6971c")
    .setTitle('Список команд')
    .addFields(
      { name: "Управління чергою терків", value:  "1play \n 1stop \n 1skip \n 1prew" },
      { name: "Всановлення музичного каналу", value:  "1setchannel" },
    )
    .setFooter({ text: "SDED Community " });
    message.channel.send({ embeds: [embed] });
  },

  setChannel: function (message, db) {
    var mention = message.content
    const { MessageMentions: { CHANNELS_PATTERN } } = require('discord.js');
    const matches = mention.matchAll(CHANNELS_PATTERN).next().value;
     if(matches){
       db.query(`INSERT INTO channels (guild_id, channel_id)
     VALUES
         (${message.guild.id}, ${message.channel.id})
     ON DUPLICATE KEY UPDATE
     channel_id = ${message.channel.id}`)
       message.reply('Ok')
     }else{
       message.reply('Try again')
     }
  },

};
