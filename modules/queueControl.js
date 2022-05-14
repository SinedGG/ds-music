module.exports = {
  prew: function (message, servers) {
    var server = servers[message.guild.id];
    if (server.queue.position - 1 < 0) return;
    servers[message.guild.id].queue.position -= 2;
    if (server.dispatcher) server.dispatcher.stop();
  },

  skip: function (message, servers) {
    var server = servers[message.guild.id];
    if (server.dispatcher) server.dispatcher.stop();
  },

  stop: function (message, servers) {
    var server = servers[message.guild.id];
    if (server.last_message) server.last_message.reactions.removeAll();
    server.connection.disconnect();
  },
};
