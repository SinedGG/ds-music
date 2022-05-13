const playSong = require("./playSong.js");

const { joinVoiceChannel } = require("@discordjs/voice");

function connect(bot, message) {
  var server = bot.servers[message.guild.id];

  if (!server.connection) {
    server.connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.member.voice.channel.guild.id,
      adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
    });
    playSong(bot, message);
    console.log(`Connected to voice in guild ${message.guild.name}`);
  }
}

module.exports = connect;
