const playSong = require("./playSong.js");

const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");

function connect(bot, message, content) {
  
  var server = bot.servers[message.guild.id];

  server.queue.url.push(content);
  server.queue.requested.push(message.author);

  if (!server.connection) {
    server.connection = joinVoiceChannel({
    channelId: message.member.voice.channel.id,
    guildId: message.member.voice.channel.guild.id,
    adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
  });
  playSong(bot, message);
}


  /*
  if (!server.connection) {
    message.member.voice.channel.join().then((connection) => {
      server.connection = connection;
      playSong(bot, message);
    });
  }else{
    server.queue.url.push(url);
    server.queue.requested.push(message.author);
  }*/




}

module.exports = connect;
