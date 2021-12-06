module.exports = {
  skip: function (message, servers) {
    var server = servers[message.guild.id];
    if (server.dispatcher) server.dispatcher.end();
  },

  stop: function (message, servers) {
    servers[message.guild.id].queue = { url: [], reuested: [] };
    servers[message.guild.id].dispatcher.end();
  },
};
