module.exports = {
  help: function (message) {
   
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
