function logPlaylist(message, count) {
    message.channel.send(`В чергу додано ${count} записів `);
  }

  module.exports = logPlaylist;