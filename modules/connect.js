const playSong = require("./play/playSong.js");

function connect(bot, message) {
  var server = bot.servers[message.guild.id];
  if (!server.connection) {
    message.member.voice.channel.join().then((connection) => {
      server.connection = connection;
      playSong(bot, message);
    });
  }else{
    playSong(bot, message);
  }
}

module.exports = connect;
