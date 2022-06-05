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
  insert: function (message, servers) {
    var server = servers[message.guild.id];
    if (server.dispatcher) {
      var args = message.content.split(" ");
      if (args[1].includes("youtube.com") || args[1].includes("youtu.be")) {
        server.queue.url.splice(server.queue.position, 0, args[1]);
      }
    }
  },
  mix: function (message, servers) {
    var server = servers[message.guild.id];
    for (var i = server.queue.url.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = server.queue.url[i];
      server.queue.url[i] = server.queue.url[j];
      server.queue.url[j] = temp;
      var temp = server.queue.requested[i];
      server.queue.requested[i] = server.queue.requested[j];
      server.queue.requested[j] = temp;
    }
  },
};
