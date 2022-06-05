const pauseMessage = require("../modules/output/pauseMessage.js");

module.exports = {
  prew: function (message, servers) {
    var server = servers[message.guild.id];
    if (server.queue.position - 1 < 0) return;
    servers[message.guild.id].queue.position -= 2;
    if (server.dispatcher) server.dispatcher.stop();
  },

  skip: function (message, servers) {
    var server = servers[message.guild.id];
    var args = message.content.split(" ");
    if (args[1]) {
      var parsed = parseInt(args[1]);
      if (!isNaN(parsed)) {
        servers[message.guild.id].queue.position += parsed;
      }
    }
    if (server.dispatcher) server.dispatcher.stop();
  },

  stop: function (message, servers) {
    var server = servers[message.guild.id];
    if (server.last_message)
      server.last_message.reactions.removeAll().catch((error) => {});
    server.connection.disconnect();
  },

  add: function (server, url, author) {
    server.queue.url.push(url);
    server.queue.requested.push(author);
  },
  pause: function (message, servers) {
    var server = servers[message.guild.id];
    if (server.dispatcher) {
      server.dispatcher.pause();
      pauseMessage(message);
      console.log(`Paused in guild ${message.guild.name}`);
    }
  },
  resume: function (message, servers) {
    var server = servers[message.guild.id];
    if (server.dispatcher) {
      server.dispatcher.unpause();
      console.log(`Resumed in guild ${message.guild.name}`);
    }
  },
};
