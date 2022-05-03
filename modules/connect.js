const playSong = require("./play/playSong.js");

function connect(bot, message, url) {
  var server = bot.servers[message.guild.id];
  if (!server.connection) {
    message.member.voice.channel.join().then((connection) => {
      server.connection = connection;
      playSong(bot, message);
    });
  }else{
    server.queue.url.push(url);
    server.queue.reuested.push(message.author);
  }
}

module.exports = connect;
