module.exports = {
  prew: function (message, servers) {
    var server = servers[message.guild.id];
    if (server.queue.position - 1 < 0) return;
    servers[message.guild.id].queue.position-=2;
    if (server.dispatcher) server.dispatcher.end();
  },

  skip: function (message, servers) {
    var server = servers[message.guild.id];
    if (server.dispatcher) server.dispatcher.end();
  },

  stop: function (message, servers) {
    if(servers[message.guild.id]){
    servers[message.guild.id].connection.disconnect();
    }
  }
};
